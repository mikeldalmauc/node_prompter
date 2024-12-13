# it's a good idea to pin this, but for demo purposes we'll leave it as is
# view https://dev.to/borisuu/setup-vite-vuejs-docker-32fb?signin=true
FROM node:latest AS builder

# automatically creates the dir and sets it as the current working dir
WORKDIR /usr/src/app
# this will allow us to run vite and other tools directly

# inject all environment vars we'll need
ARG VITE_BACKEND_URL
# expose the variable to the finished cotainer
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY package.json ./package.json

RUN npm install

# use a more specific COPY, as this will include files like `Dockerfile`, we don't really need inside our containers.
COPY . ./

FROM builder AS dev
CMD ["npm", "run", "dev"]

FROM builder AS prod-builder
RUN npm run build

# it's a good idea to pin this, but for demo purposes we'll leave it as is
FROM nginx:alpine AS prod

COPY --from=prod-builder /usr/src/app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]