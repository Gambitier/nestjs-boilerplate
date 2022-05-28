FROM node:14.17.5-alpine AS builder

RUN npm -v
RUN npm install -g npm@7.22.0
RUN npm -v
RUN npm install -g rimraf

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:14.17.5-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./dist/.env

CMD [ "npm", "run", "start:prod" ]
