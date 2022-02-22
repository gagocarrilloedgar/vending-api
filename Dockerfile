FROM node:lts-alpine

ADD package.json /app/package.json

WORKDIR /app

# Installing packages
RUN npm i

ADD . /app

ENV NODE_ENV=production
ENV NODE_PATH=dist/

# Building TypeScript files
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/index.js"]