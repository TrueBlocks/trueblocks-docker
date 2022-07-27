# Latest golang as builder
FROM golang:1.18-alpine as builder

# Install build depenedencies
RUN apk --no-cache add g++ gcc make cmake git nano libcurl python3 python3-dev \
        curl bash curl-dev linux-headers sqlite-dev

# Set workdir
WORKDIR /root

# Try to get upstream version (default v0.37.0-beta)
ARG UPSTREAM_VER=v0.37.0-beta

# Clone and make TrueBlocks Core
# make -j 5 is a fairly safe number
RUN git clone -b "${UPSTREAM_VER}" --single-branch --progress --depth 1 \
        https://github.com/TrueBlocks/trueblocks-core.git  && \
        cd trueblocks-core && mkdir build && cd build && cmake ../src && make -j 5

# Switch to alpine container
FROM alpine:latest

# Install binary dependencies and nice to haves
RUN apk --no-cache add gzip libstdc++ libgcc libcurl python3 python3-dev procps bash curl nano findutils

# Copy files from builder
COPY --from=builder /root/trueblocks-core/bin /usr/local/bin
COPY --from=builder /root/.local/bin/chifra /root/.local/bin/chifra
COPY --from=builder /root/.local/share/trueblocks /root/.local/share/trueblocks

# Copy entrypoint file
COPY core.entrypoint.sh /root

# Overwrite default config file
COPY trueBlocks.toml /root/.local/share/trueblocks/

# Testing
COPY test/core-test.entrypoint.sh /root
RUN chmod +x /root/core-test.entrypoint.sh

# Expose ports
ARG SERVE_PORT=8080
EXPOSE ${SERVE_PORT}

# Run entrypoint script
ENTRYPOINT bash /root/core.entrypoint.sh
