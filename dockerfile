FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV NODE_USER node

USER $NODE_USER

CMD [ "npm", "run", "dev" ]