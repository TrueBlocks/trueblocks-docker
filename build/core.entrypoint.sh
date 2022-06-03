#!/bin/bash

# Tell chifra we're running in docker
export DOCKER_MODE=true

# Locations of config files
CONFIG_FILE=/root/.local/share/trueblocks/trueBlocks.toml

# TODO: seems unneeded
# Try to write etherscan key and mainnet variables to trueBlocks.toml on every startup
# sed -i "s|etherscan_key =.*|etherscan_key = \"$ETHERSCAN_KEY\"|" $CONFIG_FILE
# sed -i "s|localExplorer =.*# chains.mainnet|localExplorer = \"${MAINNET_LOCAL_EXPLORER:-http://localhost:1234}\" # chains.mainnet|" $CONFIG_FILE
# sed -i "s|pinGateway =.*# chains.mainnet|pinGateway = \"${MAINNET_PIN_GATEWAY:-https://ipfs.unchainedindex.io/ipfs/}\" # chains.mainnet|" $CONFIG_FILE
# sed -i "s|remoteExplorer =.*# chains.mainnet|remoteExplorer = \"${MAINNET_REMOTE_EXPLORER:-https://etherscan.io}\" # chains.mainnet|" $CONFIG_FILE
# sed -i "s|rpcProvider =.*# chains.mainnet|rpcProvider = \"${MAINNET_RPCPROVIDER:-http://localhost:8545}\" # chains.mainnet|" $CONFIG_FILE
# sed -i "s|apiProvider =.*# chains.mainnet|apiProvider = \"${MAINNET_API_PROVIDER:-http://localhost:8080}\" # chains.mainnet|" $CONFIG_FILE


# TODO: remove
env

# Run `chifra init` in the background if we want to bootstrap
# There seems to be a bug that prevents chifra init -all from running before chifra init
if [ "${BOOTSTRAP_BLOOM_FILTERS:-true}" = true ] ; then
    if [ "${BOOTSTRAP_FULL_INDEX:-false}" = true ] ; then
        echo "Downloading bloom filters AND full index in the background"
        (chifra init && chifra init --all) &
    else
        echo "Downloading bloom filters in the background"
        chifra init &
    fi
fi

# Run scraper if enabled
if [ "${RUN_SCRAPER:-true}" = true ] ; then
    echo "Starting Scraper"
    # TODO: --file workaround
    echo $SCRAPER_FILE > /tmp/scraper
    chifra scrape $SCRAPER_ARGS --file /tmp/scraper &
    #chifra scrape $SCRAPER_ARGS &
fi

# Run chifra serve
chifra serve --port 0.0.0.0:${SERVE_PORT:-8080} --verbose ${SERVE_VERBOSITY:-10}
