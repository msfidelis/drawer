FROM node:8.6.0-alpine

RUN mkdir -p /app
WORKDIR /app

COPY . /app
RUN npm install

CMD ["npm", "start"]