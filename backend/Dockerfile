# Stage 1: Build the application
FROM node:14 AS build


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . ./

# Stage 2: Use a smaller runtime image
FROM node:14-alpine

# Install SQLite3 and dependencies on the runtime image
RUN apk update && \
    apk add --no-cache sqlite sqlite-dev


WORKDIR /usr/src/app


COPY --from=build /usr/src/app /usr/src/app


RUN npm install 


EXPOSE 8081


CMD ["node", "app.js"]
