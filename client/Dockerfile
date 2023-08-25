# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /src

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend code to the container
COPY . .

# Build the frontend code
RUN npm run build

# Specify the command to run your frontend application
CMD ["npm", "run", "dev", "--host"]