# ETAPA 1: Construcción (Builder)
FROM node:20-alpine as builder

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos archivos de dependencias desde el contexto (raíz de servicio/clientes)
COPY package*.json ./

# Instalamos solo dependencias de producción
RUN npm install --omit=dev

# Copiamos el resto del código (carpeta src, index.js, etc.)
COPY . .

# ETAPA 2: Ejecución (Runtime)
FROM node:20-alpine

# Definimos el entorno
ENV NODE_ENV=production

WORKDIR /app

# Traemos lo necesario de la etapa anterior
COPY --from=builder /app ./

# Por seguridad, usamos el usuario node
RUN chown -R node:node /app
USER node

# Puerto del microservicio clientes
EXPOSE 3002

# Ejecutamos el index.js que está dentro de la carpeta src (según tu estructura)
CMD [ "node", "src/index.js" ]