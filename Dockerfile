FROM node:18.19.1-bullseye-slim AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json yarn.lock ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY .. .
RUN yarn build:self-contained

FROM base AS runner
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
RUN addgroup --gid 1001 --system nodejs
RUN adduser --group graphql --uid 1001

COPY --from=builder --chown=graphql:nodejs /app/build ./

USER node

EXPOSE 4000
ENV NODE_ENV production
ENV PORT 4000
CMD ["dumb-init", "node", "src/server/fastify/server.js"]
