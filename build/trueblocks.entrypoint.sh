#!/bin/bash

echo "setting rpc provider to $RPC_PROVIDER"
sed -i "s|\"http:\/\/.*\"|\"$RPC_PROVIDER\"|" /root/.quickBlocks/quickBlocks.toml
cat /root/.quickBlocks/quickBlocks.toml
cd /root/.quickBlocks/monitors
forever /root/api/server.js &
chifra scrape &
chifra daemon
