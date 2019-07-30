#!/bin/bash

echo "setting rpc provider to $RPC_PROVIDER"
sed -i "s|\"http:\/\/.*\"|\"$RPC_PROVIDER\"|" /root/.quickBlocks/quickBlocks.toml
cat /root/.quickBlocks/quickBlocks.toml

export DOCKER_MODE=true
rm -f /root/.quickBlocks/cache/tmp/*
chifra scrape --sleep 14 &
forever /root/api/server.js 80
