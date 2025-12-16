# ==========================================================
# ETAPA 1: BUILDER (Instala dependencias)
# ==========================================================
FROM node:20-alpine as builder

# Define la carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias. 
# Recuerda que Docker buscará estos archivos en el 'context' definido en docker-compose (../../servicio/seguridad)
COPY package*.json ./

# Instala las dependencias, excluyendo las de desarrollo.
RUN npm install --omit=dev

# Copia el código fuente restante
COPY . .

# ==========================================================
# ETAPA 2: PRODUCCIÓN (Crea la imagen final ligera)
# ==========================================================
FROM node:20-alpine

# Define la carpeta de trabajo para la imagen final
WORKDIR /app

# Copia solo los archivos necesarios (código y node_modules) desde la etapa builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# BUENA PRÁCTICA: Correr el proceso con un usuario no-root por seguridad
USER node

# Puerto que usará el microservicio (Informativo, el mapeo es en docker-compose)
EXPOSE 3001

# Comando de inicio del microservicio
CMD [ "node", "index.js" ]