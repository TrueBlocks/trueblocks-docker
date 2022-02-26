FROM golang:1.18rc1-alpine3.14 as builder

RUN apk add --no-cache g++ gcc make cmake git nano libcurl python3 python3-dev \
        curl bash curl-dev linux-headers

RUN apk --no-cache add ca-certificates wget
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk
RUN apk add glibc-2.28-r0.apk

WORKDIR /root

ADD https://api.github.com/repos/TrueBlocks/trueblocks-core/git/refs/heads/develop version.json
RUN git clone -b 'develop' --single-branch --progress --depth 1 \
        https://github.com/TrueBlocks/trueblocks-core.git \
        /trueblocks-core
#root/src

#RUN cd /root/src && \
RUN cd /trueblocks-core && \
        mkdir -v build && \
        cd build && \
        bash ../src/other/install/docker/clean_for_docker.sh && \
        cmake ../src && \
        make -j 4

## Build trueblocks-core in stock Go builder container
#FROM golang:1.17-alpine as builder
#
## Install additional build depenedencies
#RUN apk --no-cache add g++ gcc make cmake git nano libcurl python3 python3-dev \
#        curl bash curl-dev linux-headers sqlite-dev
#
## Add source to container
#ADD . /trueblocks-core
#
## Build trueblocks-core
## make -j <cpu_cores> (4+1 is a safe enough number)
#RUN cd /trueblocks-core && mkdir build && cd build && cmake ../src && make -j 5
#

# Switch to an alpine container
FROM alpine:latest

# Install binary dependencies and nice to haves
RUN apk --no-cache add ca-certificates gzip libstdc++ libgcc libcurl python3 python3-dev procps bash curl nano

# Copy files from builder
COPY --from=builder /trueblocks-core/bin /usr/local/bin
COPY --from=builder /root/.local/bin/chifra /root/.local/bin/chifra
COPY --from=builder /root/.local/share/trueblocks /root/.local/share/trueblocks

# If no command is provided return help
CMD ["chifra", "--help"]
