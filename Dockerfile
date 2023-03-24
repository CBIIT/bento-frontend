FROM node:16-stretch-slim  as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx lerna run build

FROM nginx:1.23.3-alpine-slim

COPY --from=build /usr/src/app/packages/bento-frontend/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/conf/inject.template.js /usr/share/nginx/html/dist
COPY --from=build /usr/src/app/conf/nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=build /usr/src/app/conf/entrypoint.sh /

ENV PORT 80

ENV HOST 0.0.0.0

RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"

EXPOSE 80

ENTRYPOINT [ "sh", "/entrypoint.sh" ]
