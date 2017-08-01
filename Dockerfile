FROM node:7.7

ENV ES_SERVER="http://elastic:changeme@10.0.0.125:9200"
ENV NODE_PORT=3000

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]