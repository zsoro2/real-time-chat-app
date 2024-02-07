# Dockerfile

FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY prisma ./prisma/ 

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Expose the port your app runs on
EXPOSE 9000

# Define the command to run your app
CMD [ "npm", "run", "dev"]

