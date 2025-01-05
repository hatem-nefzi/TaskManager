# Stage 1: Build the application
FROM node:14 AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Stage 2: Use a smaller runtime image
FROM node:14-alpine

# Install SQLite3 and dependencies on the runtime image
RUN apk update && \
    apk add --no-cache sqlite sqlite-dev

# Set working directory
WORKDIR /usr/src/app

# Copy the necessary files from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Install only production dependencies (optional)
RUN npm install --only=production

# Expose the port the app will run on
EXPOSE 8081

# Run the app
CMD ["node", "app.js"]
