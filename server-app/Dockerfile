# Use a Debian-based Node.js image
FROM node:22-bullseye

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN npm ci

# Build the application
RUN npm run build
ENV NODE_ENV production

# Command to run the application
CMD ["npm", "run", "start"]