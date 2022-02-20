FROM node:14-alpine

WORKDIR /

COPY package*.json ./

RUN npm install --prod

COPY . .

EXPOSE 3000

CMD [ "npm", "start"]