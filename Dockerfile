# ---------- Build Stage ----------
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the Vite app → outputs static files to /app/dist
RUN npm run build


# ---------- Run Stage ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Bring over only what's needed to run the built app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080

# Uses "start" from package.json:
# "start": "serve -s dist -l $PORT"
CMD ["npm", "run", "start"]
