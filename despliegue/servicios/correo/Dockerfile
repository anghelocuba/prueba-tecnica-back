# ==========================================================
# ETAPA 1: BUILDER (Instala dependencias)
# ==========================================================
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

# ==========================================================
# ETAPA 2: PRODUCCIÓN (Crea la imagen final ligera)
# ==========================================================
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

USER node

# Este microservicio no tiene una API HTTP expuesta, solo escucha RabbitMQ, 
# por lo que EXPOSE es opcional o puede usarse para health checks internos.

# Comando de inicio del microservicio
CMD [ "node", "index.js" ]