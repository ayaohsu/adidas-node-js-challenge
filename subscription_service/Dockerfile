FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "subscription_server.js" ]