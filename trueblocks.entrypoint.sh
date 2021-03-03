#!/bin/bash

# write the RPC provider to quickBlocks.toml
sed -i "s|rpcProvider =.*|rpcProvider = \"$RPC_PROVIDER\"|" /root/.quickBlocks/quickBlocks.toml

export DOCKER_MODE=true
# chifra scrape --sleep 14 --daemon &
# forever /root/trueblocks-explorer/api/server.js 80
chifra serve
