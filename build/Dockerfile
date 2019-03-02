FROM python:3.7 as builder

WORKDIR /root

# Install the build environment
RUN apt-get update && \
	apt-get install -y \
	build-essential \
	cmake \
	git \
	nano \
	libcurl3-dev

# Install ipfs
RUN apt-get update && \
    apt-get install golang-go -y  && \
    wget https://dist.ipfs.io/go-ipfs/v0.4.10/go-ipfs_v0.4.10_linux-386.tar.gz  && \
    tar xvfz go-ipfs_v0.4.10_linux-386.tar.gz  && \
    mv go-ipfs/ipfs /usr/local/bin/ipfs

# Download and install the QuickBlocks repo (remove some unneeded stuff)
ADD https://api.github.com/repos/tjayrush/quickBlocks/git/refs/heads/develop version.json
RUN git clone --verbose -b 'develop' --single-branch https://github.com/tjayrush/quickBlocks /root/quickBlocks-src
RUN rm -f -R /root/quickBlocks-src/test
RUN rm -f -R /root/quickBlocks-src/docs
RUN rm -f -R /root/quickBlocks-src/other/toml-test

# Build the apps
RUN cd /root/quickBlocks-src && \
	mkdir -v build && \
	cd build && \
	cmake ../src && \
	make blockScrape getBlock acctScrape chifra grabABI ethName && \
	mkdir -p /root/.quickBlocks/cache/addr_index/sorted_by_addr/ && \
	mkdir -p /root/.quickBlocks/cache/addr_index/zips/ && \
	mkdir -p /root/.quickBlocks/chifra/ && \
	mkdir -p /root/.quickBlocks/names/ && \
	cp ../src/other/install/quickBlocks.toml /root/.quickBlocks/quickBlocks.toml && \
	cp ../src/other/install/blockScrape.docker.toml /root/.quickBlocks/blockScrape.toml && \
    cp ../src/other/install/names.txt /root/.quickBlocks/names/ && \
    cp ../src/apps/chifra/templates/config.toml /root/.quickBlocks/chifra/ && \
    cp ../src/apps/chifra/templates/ipfs_get.docker.sh /root/.quickBlocks/chifra/ipfs_get.sh && \
    cp /usr/local/bin/ipfs /root/.quickBlocks/chifra/ && \
    ls -lR /root/.quickBlocks/chifra

FROM node:slim as base
WORKDIR /root

RUN apt-get update && apt-get install -y libcurl3-dev python
COPY src /root/api

COPY --from=builder /root/quickBlocks-src/bin /usr/local/bin
COPY --from=builder /root/.quickBlocks /root/.quickBlocks

COPY --from=builder /root/.quickBlocks/chifra/ipfs /usr/local/bin/
RUN ipfs init

RUN cd /root/api && npm install && npm install -g forever && mkdir /root/.quickBlocks/monitors
COPY trueblocks.entrypoint.sh /root

EXPOSE 80

ENTRYPOINT bash /root/trueblocks.entrypoint.sh
