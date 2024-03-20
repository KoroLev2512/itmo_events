FROM node:18-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --prefer-offline
COPY . .
RUN yarn build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.output  .
ENV HOST 0.0.0.0
ENV PORT 8080
EXPOSE 8080
CMD [ "node", "./server/index.mjs" ]
