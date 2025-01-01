FROM node:18

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем все остальные файлы
COPY . .

# Открываем порт
EXPOSE 3000

# Запуск приложения
CMD ["npm", "run", "start:prod"]
