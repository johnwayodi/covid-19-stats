FROM node:alpine
WORKDIR '/app'
COPY package.json ./
RUN npm install
COPY . . 
RUN npm run build:prod

FROM nginx
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
