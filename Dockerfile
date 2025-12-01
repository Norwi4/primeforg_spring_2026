# Используем официальный образ Node.js
FROM node:20-alpine AS base

# 1. Установка зависимостей
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# 2. Сборка приложения
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Устанавливаем NODE_ENV в 'production' для сборки
ENV NODE_ENV=production

# Запускаем команду сборки
RUN npm run build

# 3. Запуск приложения
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Копируем собранные файлы из стадии builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
