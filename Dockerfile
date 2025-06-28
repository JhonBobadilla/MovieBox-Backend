# Imagen base oficial de Node.js
FROM node:18

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia archivos package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto que usa tu app
EXPOSE 3000

# Comando para iniciar tu app
CMD ["npm", "start"]
