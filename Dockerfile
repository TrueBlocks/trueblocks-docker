FROM python@sha256:99a39f3907ab81c7800eb7f9bcfa28475d9b081133615c6fa86616a7d14bf2af as builder

WORKDIR /root

RUN curl https://dl.google.com/go/go1.14.2.linux-amd64.tar.gz --output go1.14.2.linux-amd64.tar.gz && \
	tar -C /usr/local -xzf go1.14.2.linux-amd64.tar.gz && \
	ln -s /usr/local/go/bin/* /usr/local/bin/

RUN apt-get update && \
	apt-get install -y \
	build-essential \
	cmake \
	git \
	nano \
    libcurl3-dev

ADD https://api.github.com/repos/Great-Hill-Corporation/trueblocks-core/git/refs/heads/develop version.json
RUN git clone -b 'develop' --single-branch --progress --depth 1 \ 
	https://github.com/Great-Hill-Corporation/trueblocks-core \
	/root/quickBlocks-src && \
	cat /root/quickBlocks-src/src/other/install/docker/post_build.sh

RUN cd /root/quickBlocks-src && \
	mkdir -v build /root/.quickBlocks && \
	cd build && \
	bash ../src/other/install/docker/clean_for_docker.sh && \
	cmake ../src && \
	make && \
	bash ../src/other/install/docker/post_build.sh

RUN git clone -b 'master' --single-branch --progress --depth 1 \ 
	https://github.com/TrueBlocks/trueblocks-explorer \
	/root/trueblocks-explorer

FROM node@sha256:9dfb7861b1afc4d9789e511f4202ba170ac7f4decf6a2fc47fab33a9ce8c0aab as base
WORKDIR /root

RUN apt-get update && apt-get install -y libcurl3-dev python procps
COPY --from=builder /root/trueblocks-explorer /root/trueblocks-explorer
COPY --from=builder /root/quickBlocks-src/bin /usr/local/bin
COPY --from=builder /root/.quickBlocks /root/.quickBlocks

RUN cd /root/trueblocks-explorer/api && \
	npm install && \
	npm install -g forever && \
	mkdir /root/.quickBlocks/monitors

COPY trueblocks.entrypoint.sh /root

EXPOSE 80

ENTRYPOINT bash /root/trueblocks.entrypoint.sh
