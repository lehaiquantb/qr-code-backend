FROM node:16.17-alpine as development

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn add glob rimraf

RUN yarn install

COPY . .

RUN yarn run build

FROM node:16.17-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]