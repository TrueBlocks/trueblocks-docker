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
	 https://github.com/Great-Hill-Corporation/quickBlocks.git \
	/root/quickBlocks-src

RUN cd /root/quickBlocks-src && \
	mkdir build && \
	cd build && \
	cmake ../src && \
	make blockScrape getBlock && \
	mkdir /root/.quickBlocks && \
	cp ../src/other/install/quickBlocks.toml /root/.quickBlocks

FROM python:3.7-slim as base
WORKDIR /root
RUN apt-get update && apt-get install -y libcurl3-dev
COPY --from=builder /root/quickBlocks-src/bin /usr/local/bin
COPY --from=builder /root/.quickBlocks /root/.quickBlocks
RUN ln -s /usr/local/bin/python /usr/bin/python

RUN sed -i "s|localhost|my.ethchain.dnp.dappnode.eth|g" /root/.quickBlocks/quickBlocks.toml
#RUN sed -i "s|localhost|docker.for.mac.localhost|g" /root/.quickBlocks/quickBlocks.toml

ENTRYPOINT ["scraper.docker.py"]
