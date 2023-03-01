FROM node:18.14.2-bullseye-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node build ./
CMD ["dumb-init", "node", "src/server/fastify/server.js"]
