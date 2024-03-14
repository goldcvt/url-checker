# I don't use 20-alpine tag because it's not an officially supported image
# and may behave weirdly in some cases
# Stage 1: Build stage
FROM node:20-buster-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production stage
FROM node:20-buster-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm ci --only=production
CMD ["npm", "run", "start:prod"]