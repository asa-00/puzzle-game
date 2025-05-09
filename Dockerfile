# Dockerfile
FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start"]
