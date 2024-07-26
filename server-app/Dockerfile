FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN npm ci

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV production
ENV PORT 5001

# Expose the application port
EXPOSE 5001

# Command to run the application
CMD ["npm", "run", "start"]