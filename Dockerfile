# Stage 1: Build the application
FROM node:18.19.0-alpine As development

WORKDIR /app

COPY package.json .
RUN npm install -g npm@latest
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Use a lighter-weight nginx image for the production environment
FROM nginx:alpine
EXPOSE 3000


# Set the default command to start nginx
CMD ["nginx", "-g", "daemon off;"]
