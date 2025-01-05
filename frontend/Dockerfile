# Use the official Nginx image from Docker Hub
FROM nginx:alpine

# Copy the frontend files into the Nginx HTML folder
COPY . /usr/share/nginx/html/

# Expose the port the app will run on
EXPOSE 80

# The default command for Nginx is already set, so no need to specify it