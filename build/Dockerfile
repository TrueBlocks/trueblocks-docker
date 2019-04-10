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
<<<<<<< HEAD
RUN git clone --verbose -b 'develop' --single-branch https://github.com/tjayrush/quickBlocks /root/quickBlocks-src
#RUN rm -f -R /root/quickBlocks-src/test
#RUN rm -f -R /root/quickBlocks-src/docs

# Build the apps
RUN pwd
RUN ls -l
RUN cd /root/quickBlocks-src
RUN pwd
RUN ls -l
RUN exit
RUN mkdir -v build
RUN ls -l
RUN cd build
RUN ls -l
RUN pwd
RUN find ../src | grep -v git | grep -v ipfs
RUN cmake -v ../src
RUN find .
RUN	make blockScrape getBlock acctScrape chifra grabABI ethName
RUN	mkdir -p /root/.quickBlocks/cache/addr_index/sorted/
RUN	mkdir -p /root/.quickBlocks/cache/addr_index/zips/
RUN	mkdir -p /root/.quickBlocks/chifra/
RUN	mkdir -p /root/.quickBlocks/names/
RUN	cp ../src/other/install/quickBlocks.toml /root/.quickBlocks/quickBlocks.toml
RUN	cp ../src/other/install/names.txt /root/.quickBlocks/names/
RUN	cp ../src/apps/chifra/templates/config.toml /root/.quickBlocks/chifra/
RUN	cp ../src/apps/chifra/templates/ipfs_get.docker.sh /root/.quickBlocks/chifra/ipfs_get.sh
RUN	cp /usr/local/bin/ipfs /root/.quickBlocks/chifra/
RUN	ls -lR /root/.quickBlocks/chifra
=======
RUN git clone -b 'develop' --single-branch --progress \ 
	https://github.com/tjayrush/quickBlocks \
	/root/quickBlocks-src

RUN cd /root/quickBlocks-src && \
	mkdir -v build && \
	cd build && \
	cmake ../src && \
	make blockScrape getBlock acctScrape chifra && \
	mkdir -p /root/.quickBlocks/cache/addr_index/sorted_by_addr/ && \
	cp ../src/other/install/quickBlocks.toml /root/.quickBlocks/quickBlocks.toml && \
	cp ../src/other/install/blockScrape.docker.toml /root/.quickBlocks/blockScrape.toml
>>>>>>> 1b4cce05ae4299fcea3fbf778012a3ef6c9372c2

FROM node:slim as base
WORKDIR /root

RUN apt-get update && apt-get install -y libcurl3-dev python
COPY src /root/api

COPY --from=builder /root/quickBlocks-src/bin /usr/local/bin
COPY --from=builder /root/.quickBlocks /root/.quickBlocks
<<<<<<< HEAD

COPY --from=builder /root/.quickBlocks/chifra/ipfs /usr/local/bin/
RUN ipfs init

RUN cd /root/api && npm install && npm install -g forever && mkdir /root/.quickBlocks/monitors
=======
RUN cd /root/api && \
	npm install && \
	npm install -g forever && \
	mkdir /root/.quickBlocks/monitors
>>>>>>> 1b4cce05ae4299fcea3fbf778012a3ef6c9372c2
COPY trueblocks.entrypoint.sh /root

EXPOSE 80

ENTRYPOINT bash /root/trueblocks.entrypoint.sh
