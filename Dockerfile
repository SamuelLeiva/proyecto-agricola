FROM node:20

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

# npm run start:dev
CMD ["npm ", "run", "start:dev"]
