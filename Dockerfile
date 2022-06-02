FROM node:16-alpine3.14 as builder

WORKDIR /app

COPY package.json /app

RUN yarn config set registry https://registry.npm.taobao.org && \
  yarn install 

COPY . .

RUN yarn run build

FROM nginx:1.21-alpine

WORKDIR /var/nginx/html
COPY --from=builder /app/dist/ .
COPY nginx.host.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
