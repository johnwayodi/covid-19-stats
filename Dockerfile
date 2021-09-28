# BUILD
FROM node:alpine
WORKDIR '/app'
COPY package.json ./
RUN npm install
COPY . . 
RUN npm run build:prod
# RELEASE
FROM nginx
COPY /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
