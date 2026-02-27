# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source code
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Compile TypeScript
RUN npm install typescript @types/node --save-dev && \
    npx tsc


# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Add non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files
COPY backend/package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# Copy compiled code from builder
COPY --from=builder /app/dist ./dist

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 7000

CMD ["node", "dist/main.js"]
