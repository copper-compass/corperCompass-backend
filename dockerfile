# Use official Node.js LTS image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Final stage
FROM node:18-alpine

WORKDIR /app

# Copy built node_modules and source from builder
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Expose API port
EXPOSE 5000

# Set environment variables (can be overridden)
ENV NODE_ENV=production
ENV PORT=5000

# Start the server
CMD ["node", "src/server.js"]
