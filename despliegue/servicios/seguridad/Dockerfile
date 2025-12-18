# ETAPA 1: Construcción (Builder)
FROM node:20-alpine as builder

# Define la carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias (vienen de servicio/seguridad/)
COPY package*.json ./

# Instala solo las dependencias de producción
RUN npm install --omit=dev

# Copia el código fuente restante (src, .env, etc.)
COPY . .

# ETAPA 2: Ejecución (Runtime)
FROM node:20-alpine

# Definimos entorno de producción
ENV NODE_ENV=production

WORKDIR /app

# Copia los módulos y el código desde la etapa builder
COPY --from=builder /app ./

# Seguridad: Cambiamos el dueño de los archivos al usuario node
RUN chown -R node:node /app
USER node

# Puerto que usará el microservicio de seguridad
EXPOSE 3001

# Comando de inicio apuntando a src/index.js según tu estructura
CMD [ "node", "src/index.js" ]