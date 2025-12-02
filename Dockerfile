# Этот Dockerfile состоит из трех этапов:
# 1. deps: Установка зависимостей npm.
# 2. builder: Сборка Next.js приложения.
# 3. runner: Запуск готового приложения.

# 1. Установка зависимостей
FROM node:20-alpine AS deps
WORKDIR /app
# Копируем package.json и lock-файл
COPY package.json package-lock.json* ./
# Устанавливаем зависимости
RUN npm install

# 2. Сборка приложения
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем node_modules из предыдущей стадии
COPY --from=deps /app/node_modules ./node_modules
# Копируем исходный код
COPY . .

# Устанавливаем переменную окружения для production
ENV NODE_ENV production

# Запускаем команду сборки
RUN npm run build

# 3. Запуск приложения
FROM node:20-alpine AS runner
WORKDIR /app

# Устанавливаем переменную окружения для production
ENV NODE_ENV production

# Копируем собранные файлы из стадии builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Открываем порт, на котором будет работать приложение
EXPOSE 3000

# Указываем команду для запуска приложения
CMD ["npm", "start"]
