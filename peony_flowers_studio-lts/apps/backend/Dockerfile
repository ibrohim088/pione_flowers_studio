FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json ./
COPY src/prisma ./src/prisma
RUN npm install
RUN npx prisma generate --schema=./src/prisma/schema.prisma

COPY . .
RUN npm run build

EXPOSE 4000
CMD ["npm", "run", "start"]
