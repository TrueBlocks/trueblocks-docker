FROM trueblocks/core:v0.41.0-beta

RUN apk --no-cache add jq

COPY test/monitors-test.entrypoint.sh /root
RUN chmod +x /root/monitors-test.entrypoint.sh

COPY monitors.entrypoint.sh /root

ENTRYPOINT bash /root/monitors.entrypoint.sh
