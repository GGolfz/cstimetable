FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json ./package.json

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "run", "dev" ]