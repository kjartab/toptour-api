FROM node:7.7

ENV ES_SERVER="http://elastic:changeme@10.0.0.125:9200"
ENV NODE_PORT=3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./ /usr/src/app

RUN ls /usr/src/app

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]