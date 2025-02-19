FROM node:22.14.0 AS dev

WORKDIR /usr/src/app

CMD [ "npm", "run", "start:dev" ]

