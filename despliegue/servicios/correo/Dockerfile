# ETAPA 1: Construcción (Builder)
FROM node:20-alpine as builder

# Directorio de trabajo
WORKDIR /app

# Copiamos archivos de dependencias (se buscarán en servicio/correos/)
COPY package*.json ./

# Instalamos solo dependencias de producción
RUN npm install --omit=dev

# Copiamos todo el código fuente del microservicio
COPY . .

# ETAPA 2: Ejecución (Runtime)
FROM node:20-alpine

# Definimos entorno de producción
ENV NODE_ENV=production

WORKDIR /app

# Traemos los módulos y el código desde la etapa builder
COPY --from=builder /app ./

# Seguridad: El usuario 'node' es el dueño de la app
RUN chown -R node:node /app
USER node

# El microservicio de correo usualmente no expone puerto HTTP 
# pero si lo hiciera (ej. 3003), se agregaría aquí.

# Comando de inicio apuntando a la carpeta src según tu estructura
CMD [ "node", "src/index.js" ]