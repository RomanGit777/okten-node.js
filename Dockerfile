# Backend build stage
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend

# Copy package files
COPY backend/package*.json ./

# Install dependencies with cache mount
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

# Copy source and config
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Install dev dependencies for build only
RUN --mount=type=cache,target=/root/.npm \
    npm install --save-dev typescript @types/node

# Compile TypeScript
RUN npm run build 2>/dev/null || npx tsc

# Frontend build stage
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY frontend/public ./public
COPY frontend/src ./src

ENV REACT_APP_API_URL=/api
ENV CI=true

RUN --mount=type=cache,target=/root/.npm \
    npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Install curl for healthchecks
RUN apk add --no-cache curl

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy backend production files
COPY backend/package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production && \
    npm cache clean --force

COPY --from=backend-builder /app/backend/dist ./dist

# Copy frontend build to public folder for serving
RUN mkdir -p public
COPY --from=frontend-builder /app/frontend/build ./public

# Fix permissions
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 7000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:7000/api/health || exit 1

CMD ["node", "dist/main.js"]
