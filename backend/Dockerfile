# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Nếu có build (ts -> dist) thì bật:
# RUN npm run build

# Runtime stage
FROM node:22-alpine
WORKDIR /app

RUN addgroup -S nodejs -g 1001 && adduser -S nodejs -u 1001 -G nodejs

# Chỉ copy những thứ cần thiết để chạy
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/. ./

# Nếu có dist thì nên copy dist thay vì copy hết:
# COPY --from=builder /app/dist ./dist

RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

# Nếu entry đúng là server.js:
CMD ["node", "server.js"]
# Nếu TS build ra dist:
# CMD ["node", "dist/server.js"]
# Hoặc chuẩn nhất: dùng script
# CMD ["npm","start"]
