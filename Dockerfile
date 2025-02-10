# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Create and use a non-root user
RUN addgroup -S nodejs && adduser -S nodejsuser -G nodejs
RUN chown -R nodejsuser:nodejs /app
USER nodejsuser

# Install dependencies
COPY --chown=nodejsuser:nodejs package*.json ./
RUN npm install

# Copy source code
COPY --chown=nodejsuser:nodejs . .

# Ensure the build directory exists and has correct permissions
RUN mkdir -p dist && chown -R nodejsuser:nodejs dist

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]