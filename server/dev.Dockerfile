ARG NODE_VERSION=12.18.4

FROM node:${NODE_VERSION}-alpine as dependencies
WORKDIR /api
ADD ./package.json ./package.json
ADD ./yarn.lock ./yarn.lock
RUN yarn --frozen-lockfile

FROM node:${NODE_VERSION}-alpine
WORKDIR /api
ENV PATH=${PATH}:/api/node_modules/.bin
COPY --from=dependencies /api/node_modules /api/node_modules

EXPOSE 3001

ENTRYPOINT [ "./dev.entrypoint.sh" ]
