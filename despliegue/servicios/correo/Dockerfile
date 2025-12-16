
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

USER node

# Comando de inicio del microservicio
CMD [ "node", "index.js" ]