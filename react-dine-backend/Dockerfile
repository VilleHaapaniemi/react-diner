FROM node:18-alpine

COPY . /app

RUN cd /app \
  && npm install --prod

WORKDIR /app

CMD ["npm", "run", "start"]