FROM node:20.0.0-bullseye-slim

RUN groupmod -g 1000 node && usermod -u 1000 -g 1000 node

RUN apt -yq update && apt -yq upgrade && export DEBIAN_FRONTEND=noninteractive

RUN apt -yqq install --no-install-recommends curl ca-certificates \
    build-essential pkg-config clang cmake \
    wget git curl iproute2 tar jq unzip 

RUN npm install -g npm@latest

WORKDIR /usr/local/bin

COPY ./install_packages.sh ./install_packages.sh

RUN chmod +x ./install_packages.sh

RUN /bin/bash -c ./install_packages.sh

ENV RUSTUP_HOME=/opt/rustup
ENV CARGO_HOME=/opt/cargo
ENV PATH=/opt/cargo/bin:${PATH}

RUN curl --fail https://sh.rustup.rs -sSf \
    | sh -s -- -y --default-toolchain stable-x86_64-unknown-linux-gnu --no-modify-path && \
    rustup default stable-x86_64-unknown-linux-gnu && \
    rustup target add wasm32-unknown-unknown

RUN chown -R node /usr/local/bin

RUN chown -R node /opt/cargo
