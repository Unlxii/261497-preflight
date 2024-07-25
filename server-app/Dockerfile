# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app/src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 5001

# Define environment variable for MongoDB connection string
ENV CONNECTION_STRING="mongodb+srv://nue0742:C3yGdZudWxKMAvsR@url-shorter.gwa6kec.mongodb.net/?retryWrites=true&w=majority&appName=url-shorter"

# Run the app
CMD ["npm", "run", "start"]