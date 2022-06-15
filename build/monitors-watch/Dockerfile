FROM trueblocks-core:latest

# Testing
COPY test/monitors-watch-test.entrypoint.sh /root
RUN chmod +x /root/monitors-watch-test.entrypoint.sh

COPY monitors-watch.entrypoint.sh /root

# Run entrypoint script
ENTRYPOINT bash /root/monitors-watch.entrypoint.sh
