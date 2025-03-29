FROM golang:1.23-alpine as builder

RUN apk --no-cache add g++ gcc make cmake git nano libcurl python3 python3-dev \
    curl bash curl-dev linux-headers sqlite-dev sed

WORKDIR /root

ARG UPSTREAM_VER=master

RUN git clone -b "${UPSTREAM_VER}" --single-branch --progress --depth 1 \
    https://github.com/TrueBlocks/trueblocks-core.git && \
    cd trueblocks-core && \
    git submodule update --init --recursive && \
    mkdir -p build && \
    cd build && \
    ../scripts/go-work-sync.sh && \
    cmake ../src && \
    make -j 5 && \
    mkdir -p /root/trueblocks-core/bin && \
    cp /root/trueblocks-core/bin/chifra /root/trueblocks-core/bin/ || cp ./chifra /root/trueblocks-core/bin/ || echo "chifra not found"

FROM alpine:latest

RUN apk --no-cache add gzip libstdc++ libgcc libcurl python3 python3-dev procps bash curl nano findutils

COPY --from=builder /root/trueblocks-core/bin /usr/local/bin
RUN chmod +x /usr/local/bin/chifra  # Ensure chifra is executable
COPY --from=builder /root/.local/share/trueblocks /root/.local/share/trueblocks

ARG SERVE_PORT=8080
EXPOSE ${SERVE_PORT}

CMD ["chifra", "daemon"]
