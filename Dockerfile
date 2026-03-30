FROM node:20-alpine AS builder

WORKDIR /app

# ARG NEXT_PUBLIC_API_URL=http://localhost:3001
# ARG NEXT_PUBLIC_SOCKET_URL=http://localhost:3001

ARG NEXT_PUBLIC_API_URL=https://heyama-app.lzy6mi.easypanel.host
ARG NEXT_PUBLIC_SOCKET_URL=https://heyama-app.lzy6mi.easypanel.host

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SOCKET_URL=$NEXT_PUBLIC_SOCKET_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV API_URL=https://heyama-app.lzy6mi.easypanel.host

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]