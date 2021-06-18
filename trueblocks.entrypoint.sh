#!/bin/bash

chifra --version

CONFIG_FILE=/root/.local/share/trueblocks/trueBlocks.toml
BLOCKSCRAPE_FILE=/root/.local/share/trueblocks/blockScrape.toml

# write the RPC provider to quickBlocks.toml
if grep -q rpcProvider "$CONFIG_FILE"; then
    sed -i "s|rpcProvider =.*|rpcProvider = \"$RPC_PROVIDER\"|" $CONFIG_FILE
else
    echo "Writing RPC provider for the first run"
    echo "rpcProvider = \"$RPC_PROVIDER\"" >> $CONFIG_FILE
fi

# create blockScrape.toml as a workaround for https://github.com/TrueBlocks/trueblocks-core/issues/1577
# (if this file is missing, RPC returns empty response)
if [ ! -f "$BLOCKSCRAPE_FILE" ]; then
    echo "[requires]" >> $BLOCKSCRAPE_FILE
    echo "tracing=false" >> $BLOCKSCRAPE_FILE
fi

export DOCKER_MODE=true

# the host has to be set to 0.0.0.0, otherwise Docker will refuse connections
chifra serve --port 0.0.0.0:8080
