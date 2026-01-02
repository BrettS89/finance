# ---------- build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copy only package manifests first for better caching
COPY api-v2/package*.json ./api-v2/
WORKDIR /app/api-v2

# Install deps (use npm ci if you have a lockfile)
RUN npm ci

# Copy the rest of the api code
COPY api-v2/ ./

# Build TypeScript -> dist
RUN npm run build

# ---------- runtime stage ----------
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production

# Copy only what we need to run
COPY --from=build /app/api-v2/package*.json ./
COPY --from=build /app/api-v2/node_modules ./node_modules
COPY --from=build /app/api-v2/dist ./dist

# Optional: if you need runtime files (migrations, views, etc), copy them too:
# COPY --from=build /app/api-v2/scripts ./scripts

# Run as non-root
USER node

# Railway will set PORT; your app must listen on process.env.PORT and host 0.0.0.0

CMD ["sh", "-c", "npm run migrate:up && npm start"]