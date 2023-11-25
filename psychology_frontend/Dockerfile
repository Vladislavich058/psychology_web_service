ARG NODE_VERSION=20.8.0

# Используйте официальный образ Node.js как родительский образ
FROM node:${NODE_VERSION}-alpine 

# Установите рабочую директорию в /app
WORKDIR /app

# Копируйте package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Установите зависимости приложения
RUN npm install

# Копируйте исходный код приложения в рабочую директорию
COPY . .

# Соберите приложение для производства в папку build
RUN npm run build

# Укажите порт, который будет использоваться приложением
EXPOSE 3000

# Запустите приложение
CMD ["npm", "start"]