# Use a lightweight base image
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy HTML files and assets to the working directory
COPY index.html .
COPY assets/ assets/

# Expose port 80
EXPOSE 80

# Start Nginx server in the foreground
CMD ["nginx", "-g", "daemon off;"]
