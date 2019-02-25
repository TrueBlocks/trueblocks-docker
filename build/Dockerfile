FROM python:3.7 as builder

WORKDIR /root
RUN apt-get update && \
	apt-get install -y \
	build-essential \
	cmake \
	git \
	nano \
	libcurl3-dev

ADD https://api.github.com/repos/tjayrush/quickBlocks/git/refs/heads/develop version.json
RUN git clone -b 'develop' --single-branch \ 
	https://github.com/tjayrush/quickBlocks \
	/root/quickBlocks-src

RUN cd /root/quickBlocks-src && \
	mkdir -v build && \
	cd build && \
	cmake ../src && \
	make blockScrape getBlock acctScrape chifra && \
	mkdir -p /root/.quickBlocks/cache/addr_index/sorted_by_addr/ && \
	cp ../src/other/install/quickBlocks.docker.toml /root/.quickBlocks/quickBlocks.toml && \
	cp ../src/other/install/blockScrape.docker.toml /root/.quickBlocks/blockScrape.toml && \
    cp ../src/other/build_data/addr_index/sorted_by_addr/* /root/.quickBlocks/cache/addr_index/sorted_by_addr/ && \
    cd /root/.quickBlocks/cache/addr_index/sorted_by_addr/ && \
    gunzip *.gz

FROM node:slim as base
WORKDIR /root

RUN apt-get update && apt-get install -y libcurl3-dev python
COPY src /root/api
COPY --from=builder /root/quickBlocks-src/bin /usr/local/bin
COPY --from=builder /root/.quickBlocks /root/.quickBlocks
RUN cd /root/api && npm install && npm install -g forever && mkdir /root/.quickBlocks/monitors
COPY trueblocks.entrypoint.sh /root

EXPOSE 80

ENTRYPOINT bash /root/trueblocks.entrypoint.sh
