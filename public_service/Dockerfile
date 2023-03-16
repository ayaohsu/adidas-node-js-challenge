FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "public_server.js" ]