# Build in the node.js image
FROM node:16.14 as build-stage

# Create a folder to add the code to
WORKDIR /app

ENV PORT=3000
ENV MONGOPSWD=WQk1dJYdN2D73f6k
ENV MONGODBNAME=tromboneCollection
ENV NODE_ENV=production

# Copy in package.json and yarn.lock
COPY package.json ./
COPY yarn.lock ./
COPY client/package.json ./client/
COPY client/yarn.lock ./client/

# Install dependencies
RUN yarn install

# Copy the code into the container
COPY . .

RUN yarn build

EXPOSE 3000

# Set the server to hot reload on code changes
CMD yarn server
