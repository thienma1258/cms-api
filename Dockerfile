#builder stage
FROM node:16-alpine as core
# Installing libvips-dev for sharp Compatability
RUN apk update && apk add  build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

ARG NODE_ENV=staging
ENV NODE_ENV ${NODE_ENV}

WORKDIR /app/
COPY ./package.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g && yarn install 

COPY . .

#test stage
FROM core as test
WORKDIR /app/
RUN yarn lint

#build stage
FROM core as build
WORKDIR /app/
RUN yarn build

# release stage
FROM node:16-alpine as release
RUN apk add vips-dev make
RUN rm -rf /var/cache/apk/*
COPY --from=build /app ./app
WORKDIR /app/
ARG COMMIT_HASH
ENV COMMIT_HASH ${COMMIT_HASH}
RUN make inject
RUN yarn prestart
EXPOSE 1337
CMD ["yarn", "start"]