# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Create and use a non-root user
RUN addgroup -S nodejs && adduser -S nodejsuser -G nodejs
RUN chown -R nodejsuser:nodejs /app
USER nodejsuser

# Install dependencies
COPY --chown=nodejsuser:nodejs package*.json ./
RUN npm install --unsafe-perm

# Add node_modules/.bin to PATH and ensure vite is executable
ENV PATH="./node_modules/.bin:$PATH"
RUN chmod +x ./node_modules/.bin/vite

# Copy source code
COPY --chown=nodejsuser:nodejs . .

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
