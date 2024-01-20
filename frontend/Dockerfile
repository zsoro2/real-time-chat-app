# Dockerfile

# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:20

# Set the working directory
WORKDIR /app

COPY package*.json tsconfig.json next.config.mjs ./

# Install dependencies
RUN npm install

# Copy the local code to the container's working directory
COPY . . 

# Build the Next.js application
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]

