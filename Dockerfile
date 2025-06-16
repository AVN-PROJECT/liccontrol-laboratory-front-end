FROM node:22.16-slim

WORKDIR /liccontrol-laboratory-front-end

RUN apt-get update && apt-get install -y make

COPY . /liccontrol-laboratory-front-end
