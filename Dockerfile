FROM node:16 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY . .

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build
