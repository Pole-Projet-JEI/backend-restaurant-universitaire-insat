FROM node:22-alpine

WORKDIR /app

COPY . .  

RUN npm install --include=dev  

CMD ["npm", "run", "start:dev"]
