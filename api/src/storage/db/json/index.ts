import fs from 'node:fs/promises'
import { v4 as uuid } from 'uuid'
import { Db, Table } from '../types'

class JsonDbTable implements Table {
  name: string

  constructor(tableName: string) {
    this.name = tableName
  }

  private async getData() {
    const data = await fs.readFile('./src/storage/db/json/data.json', 'utf-8')

    return JSON.parse(data)
  }

  private async getDataFromTable(name: string) {
    const data = await fs.readFile('./src/storage/db/json/data.json', 'utf-8')

    const obj = JSON.parse(data)

    if (!obj[name]) {
      throw new Error('No table found with this name')
    }

    if (!Array.isArray(obj[name])) {
      throw new Error('Invalid table')
    }

    return obj[name]
  }

  async getById<T>(id: string): Promise<T | null> {
    const documents = await this.getDataFromTable(this.name)

    const document = documents.find(d => d.id === id)

    if (!document) {
      return null
    }

    return document as T
  }

  async find<T>(): Promise<T[]> {
    const documents = await this.getDataFromTable(this.name)

    return documents.sort((a, b) => a.createdAt - b.createdAt) as T[];
  }

  async create<T>(data: Record<string, any>): Promise<T> {
    const id = uuid()

    const document = {
      id,
      createdAt: new Date().toISOString(),
      ...data,
    }

    const obj = await this.getData()

    obj[this.name].push(document)

    await fs.writeFile('./src/storage/db/json/data.json', JSON.stringify(obj))

    return document as T
  }

  async findByIdAndUpdate<D, T>(id: string, data: D): Promise<T> {
    const obj = await this.getData()

    const documents = obj[this.name]

    if (!Array.isArray(documents)) {
      throw new Error('Invalid table')
    }

    const document = documents.find(d => d.id === id)

    if (!document) {
      throw new Error('No document found with this id')
    }

    const updatedDocument = {
      ...document,
      ...data,
    }

    const updatedDocuments = documents.map(d => {
      if (d.id === updatedDocument.id) {
        return updatedDocument
      }

      return d as T;
    })

    obj[this.name] = updatedDocuments

    await fs.writeFile('./src/storage/db/json/data.json', JSON.stringify(obj))

    return updatedDocument
  }

  async remove<T>(id: string) {
    const obj = await this.getData()

    const documents = obj[this.name]

    if (!Array.isArray(documents)) {
      throw new Error('Table is not an array')
    }

    const document = documents.find(d => d.id === id)

    if (!document) {
      throw new Error('No document found with this id')
    }

    const updatedDocuments = documents.filter(d => d.id !== document.id)

    obj[this.name] = updatedDocuments

    await fs.writeFile('./src/storage/db/json/data.json', JSON.stringify(obj))

    return document as T;
  }

  async batchDelete() {
    const obj = await this.getData()

    obj[this.name] = [];

    await fs.writeFile('./src/storage/db/json/data.json', JSON.stringify(obj))
  }
}

export class JsonDb implements Db {
  async connect() {
    try {
      await fs.readFile('./src/storage/db/json/data.json', 'utf-8')
    } catch {
      await fs.writeFile('./src/storage/db/json/data.json', JSON.stringify({}))
    }
  }

  async addTables(tables: string[]) {
    const data = await fs.readFile('./src/storage/db/json/data.json', 'utf-8')

    const obj = JSON.parse(data);

    for (let table of tables) {
      if (Array.isArray(obj[table])) {
        continue
      }
  
      obj[table] = []
    }

    await fs.writeFile('./src/storage/db/json/data.json', JSON.stringify(obj))
  }

  table(name: string) {
    return new JsonDbTable(name)
  }

}
