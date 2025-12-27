FROM node:lts-alpine

WORKDIR /app/api-v2
COPY package.json .
RUN npm ci --omit=dev
COPY . .

CMD ["npm", "start"]
