# Use the official Node.js 20 image as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache make gcc g++ python3

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild bcrypt
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# Set NODE_OPTIONS to enable ES modules
ENV NODE_OPTIONS=--experimental-modules

# Run the application with more debugging options
CMD ["node", "--trace-warnings", "--trace-uncaught", "--async-stack-traces", "src/index.js"]