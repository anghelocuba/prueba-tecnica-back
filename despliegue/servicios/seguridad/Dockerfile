
FROM node:20-alpine as builder

# Define la carpeta de trabajo dentro del contenedor
WORKDIR /app

COPY package*.json ./

# Instala las dependencias
RUN npm install --omit=dev

# Copia el código fuente restante
COPY . .


FROM node:20-alpine

WORKDIR /app

# Copia solo los archivos necesarios
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

USER node

EXPOSE 3001

# Comando de inicio del microservicio
CMD [ "node", "index.js" ]