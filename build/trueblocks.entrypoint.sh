#!/bin/bash

echo "setting rpc provider to $RPC_PROVIDER"
sed -i "s|\"http:\/\/.*\"|\"$RPC_PROVIDER\"|" /root/.quickBlocks/quickBlocks.toml

echo "==================== checking install ============================="
cat /root/.quickBlocks/quickBlocks.toml | grep -v "^$"
which chifra
which acctScrape
which blockScrape
which grabABI

echo "==================== starting processes ============================="
# Run the webserver
forever /root/api/server.js &

# We need to wait until the seed is done
chifra seed
chifra scrape &
chifra daemon
