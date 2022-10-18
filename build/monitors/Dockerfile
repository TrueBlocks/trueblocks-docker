FROM trueblocks/core:0.41.0-beta

RUN apk --no-cache add jq

# Testing
COPY test/monitors-test.entrypoint.sh /root
RUN chmod +x /root/monitors-test.entrypoint.sh

COPY monitors.entrypoint.sh /root

# Run entrypoint script
ENTRYPOINT bash /root/monitors.entrypoint.sh
