FROM node:16-alpine3.11 as build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build

FROM node:16-alpine3.11

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build ./build

COPY package.json yarn.lock ./

RUN yarn install --production

CMD [ "yarn", "start" ]
