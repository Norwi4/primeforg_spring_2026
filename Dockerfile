# 1. Сборка приложения
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Устанавливаем NODE_ENV в production для сборки
ENV NODE_ENV=production
# Запускаем команду сборки
RUN npm run build

# 3. Запуск приложения
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Копируем собранные файлы из стадии builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
