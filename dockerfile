FROM node:current-slim

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD npm build && npm start
