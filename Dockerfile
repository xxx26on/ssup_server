FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy tệp config
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Cài đặt dependencies
RUN yarn install --frozen-lockfile

# Copy toàn bộ code và build
COPY . .
RUN yarn build

# --- Runner Stage ---
FROM node:20-alpine
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Mở cổng 3001
EXPOSE 3001

# Chạy migrate và start app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
