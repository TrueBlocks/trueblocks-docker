FROM golang:1.20-alpine as builder

RUN apk --no-cache add g++ gcc make cmake git nano libcurl python3 python3-dev \
    curl bash curl-dev linux-headers sqlite-dev sed

WORKDIR /root

# ARG UPSTREAM_VER=feature/docker-version
# ADD https://api.github.com/repos/TrueBlocks/trueblocks-core/git/refs/heads/$UPSTREAM_VER version.json

# UPDATE_VERSION_HERE
ARG UPSTREAM_VER=v0.70.0-beta
# ARG UPSTREAM_VER=develop
RUN git clone -b "${UPSTREAM_VER}" --single-branch --progress --depth 1 \
    https://github.com/TrueBlocks/trueblocks-core.git && \
    cd trueblocks-core && \
    cat src/libs/CMakeLists.txt | grep -v "test-libs" >x && \
    cat x >src/libs/CMakeLists.txt && \
    cat src/CMakeLists.txt | grep -v "examples" | grep -v dev_tools >x && \
    cat x >src/CMakeLists.txt && \
    rm -f x && \
    mkdir -p build && \
    cd build && \
    cmake ../src && \
    make -j 5

FROM alpine:latest

RUN apk --no-cache add gzip libstdc++ libgcc libcurl python3 python3-dev procps bash curl nano findutils

COPY --from=builder /root/trueblocks-core/bin /usr/local/bin
COPY --from=builder /root/.local/bin/chifra /root/.local/bin/chifra
COPY --from=builder /root/.local/share/trueblocks /root/.local/share/trueblocks

ARG SERVE_PORT=8080
EXPOSE ${SERVE_PORT}

CMD ["chifra", "daemon", "--api", "on", "--scrape", "index"]
