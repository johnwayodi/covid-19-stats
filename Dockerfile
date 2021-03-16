### STAGE 1: Build ###
FROM node:12.7-alpine AS build

WORKDIR /usr/app
COPY . /usr/app/
RUN yarn install
RUN yarn build:prod

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
