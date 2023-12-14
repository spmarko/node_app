# Use the official Node.js image as the base image
FROM --platform=linux/amd64 node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your application runs
EXPOSE 3000

# Command to run your application
CMD ["node", "app.js"]
