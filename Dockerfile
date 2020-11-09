FROM node:14-alpine
WORKDIR /apps
COPY test-project/package*.json ./

RUN npm install
COPY test-project/*.js .

EXPOSE 3000
CMD [ "node", "server.js" ]
