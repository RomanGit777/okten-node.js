# Multi-stage React build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY public ./public
COPY src ./src

ENV REACT_APP_API_URL=/api
ENV CI=true

RUN --mount=type=cache,target=/root/.npm \
    npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache curl

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Install serve for production
RUN npm install -g serve

COPY --from=builder /app/build ./build

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1

CMD ["serve", "-s", "build", "-l", "3000"]
