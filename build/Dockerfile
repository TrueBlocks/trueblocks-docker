FROM python:3.7 as builder

WORKDIR /root
RUN apt-get update && \
	apt-get install -y \
	build-essential \
	cmake \
	git \
	nano \
	libcurl3-dev

RUN git clone -b 'develop' --single-branch \ 
	https://github.com/tjayrush/quickBlocks \
	/root/quickBlocks-src

RUN cd /root/quickBlocks-src && \
	mkdir -v build && \
	cd build && \
	cmake ../src && \
	make blockScrape getBlock acctScrape && \
	mkdir -v /root/.quickBlocks && \
	cp ../src/other/install/quickBlocks.docker.toml /root/.quickBlocks/quickBlocks.toml && \
	cp ../src/other/install/blockScrape.docker.toml /root/.quickBlocks/blockScrape.toml && \
    echo && \
	mkdir -v /root/.quickBlocks/cache/ && \
	mkdir -v /root/.quickBlocks/cache/addr_index/ && \
	mkdir -v /root/.quickBlocks/cache/addr_index/sorted_by_addr/ && \
    cp ../src/other/build_data/addr_index/sorted_by_addr/* /root/.quickBlocks/cache/addr_index/sorted_by_addr/ && \
    cd /root/.quickBlocks/cache/addr_index/sorted_by_addr/ && \
    gunzip *.gz

FROM node:slim as base
WORKDIR /root

RUN apt-get update && apt-get install -y libcurl3-dev python
COPY --from=builder /root/quickBlocks-src/bin /usr/local/bin
# CAN WE COPY THIS RECURSIVELY?
COPY --from=builder /root/.quickBlocks /root/.quickBlocks
#COPY --from=builder /root/.quickBlocks/cache /root/.quickBlocks/cache
#COPY --from=builder /root/.quickBlocks/cache/addr_index /root/.quickBlocks/cache/addr_index
#COPY --from=builder /root/.quickBlocks/cache/addr_index/sorted_by_addr /root/.quickBlocks/cache/addr_index/sorted_by_addr
#COPY --from=builder /root/.quickBlocks/cache/addr_index/sorted_by_addr/* /root/.quickBlocks/cache/addr_index/sorted_by_addr/
COPY src /root/api
COPY trueblocks.entrypoint.sh /root
RUN cd /root/api && npm install && npm install -g forever

RUN sed -i "s|localhost|my.ethchain.dnp.dappnode.eth|g" /root/.quickBlocks/quickBlocks.toml
#RUN sed -i "s|localhost|docker.for.mac.localhost|g" /root/.quickBlocks/quickBlocks.toml

EXPOSE 80

ENTRYPOINT ["bash", "/root/trueblocks.entrypoint.sh"]
