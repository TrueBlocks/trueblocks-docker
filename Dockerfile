FROM golang:1.17-alpine3.15 as builder

RUN apk add --no-cache g++ gcc make cmake git nano libcurl python3 python3-dev \
        curl bash curl-dev linux-headers sqlite-dev

RUN apk --no-cache add ca-certificates wget
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk
RUN apk add glibc-2.28-r0.apk

WORKDIR /root

ADD https://api.github.com/repos/TrueBlocks/trueblocks-core/git/refs/heads/develop version.json
RUN git clone -b 'develop' --single-branch --progress --depth 1 \
        https://github.com/TrueBlocks/trueblocks-core.git \
        /root/src

RUN cd /root/src && \
        mkdir -v build && \
        cd build && \
        bash ../src/other/install/docker/clean_for_docker.sh && \
        cmake ../src && \
        make -j 4

FROM alpine:3.12
WORKDIR /root

RUN apk add --no-cache libstdc++ libgcc libcurl python3 python3-dev procps bash
COPY --from=builder /root/src/bin /usr/local/bin
COPY --from=builder /root/.local/share/trueblocks /root/.local/share/trueblocks
COPY trueblocks.entrypoint.sh /root

# To make the shell easier to use
RUN apk add curl nano

EXPOSE 8080

ENTRYPOINT bash /root/trueblocks.entrypoint.sh
