FROM node:lts-alpine

WORKDIR /app/client
COPY . .
RUN npm install

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
