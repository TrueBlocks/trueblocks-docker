#!/bin/bash

echo "setting rpcProvider to $RPC_PROVIDER"
sed -i "s|rpcProvider =.*|rpcProvider = \"$RPC_PROVIDER\"|" /root/.quickBlocks/quickBlocks.toml

echo "setting apiProvider to $API_PROVIDER"
sed -i "s|apiProvider =.*|apiProvider = \"$API_PROVIDER\"|" /root/.quickBlocks/quickBlocks.toml

cat /root/.quickBlocks/quickBlocks.toml

export DOCKER_MODE=true
rm -f /root/.quickBlocks/cache/tmp/*
#chifra scrape --sleep 14 --daemon &
yarn start 80
