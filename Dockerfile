# Multi-stage backend build
ARG BUILDKIT_INLINE_CACHE=1
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend

# Copy package files
COPY backend/package*.json ./

# Install production dependencies with BuildKit cache mount
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

# Copy source and TypeScript config
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Install dev dependencies for build stage only
RUN --mount=type=cache,target=/root/.npm \
    npm install --save-dev typescript @types/node

# Compile TypeScript to JavaScript
RUN npm run build 2>/dev/null || npx tsc

# Multi-stage frontend build
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./

# Install frontend dependencies with BuildKit cache mount
RUN --mount=type=cache,target=/root/.npm \
    npm install

COPY frontend/public ./public
COPY frontend/src ./src
COPY frontend/tsconfig.json ./

# Build configuration for React
ENV REACT_APP_API_URL=/api
ENV CI=false

# Build React production bundle
RUN npm run build

# Production runtime stage
FROM node:20-alpine

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Create non-root user for security best practices
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy backend package files and install production dependencies
COPY backend/package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

# Copy compiled backend from builder stage
COPY --from=backend-builder /app/backend/dist ./dist

# Copy email templates
COPY backend/src/templates ./templates

# Create public directory and copy frontend build from builder stage
RUN mkdir -p public
COPY --from=frontend-builder /app/frontend/build ./public

# Set ownership to non-root user
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 7000

CMD ["node", "dist/main.js"]
