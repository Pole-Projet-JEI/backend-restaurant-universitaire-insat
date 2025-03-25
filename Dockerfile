FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# List installed packages for verification
RUN npm list

COPY . .

# Ensure case sensitivity issues are handled
RUN npm run build

CMD ["npm", "run", "start:dev"]