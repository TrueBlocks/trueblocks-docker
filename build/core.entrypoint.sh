#!/bin/bash

# Tell chifra we're running in docker
export DOCKER_MODE=true

# Locations of config files
CONFIG_FILE=/root/.local/share/trueblocks/trueBlocks.toml

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
    #TODO: this is currently unsupported by indexer scraper
    #echo "${SCRAPER_FILE:-export --appearances}" > /tmp/scraper
    #cat /tmp/scraper
    echo "${SCRAPER_FILE}" > /tmp/scraper
    chifra scrape $SCRAPER_ARGS --file /tmp/scraper &
fi

# Run chifra serve
chifra serve --port 0.0.0.0:${SERVE_PORT:-8080} --verbose ${SERVE_VERBOSITY:-10}
