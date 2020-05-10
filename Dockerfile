FROM node:12-slim

WORKDIR /usr/app
ENV NODE_ENV development

COPY package.json .

RUN npm install --quiet

COPY . .

