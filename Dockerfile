FROM node:20.0.0-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install --force

COPY . .
# Stage 2: Use a lighter-weight nginx image for the production environment
FROM nginx:alpine
EXPOSE 3000

CMD ["node", "server.js"]
