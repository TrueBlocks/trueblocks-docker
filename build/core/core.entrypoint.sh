#!/bin/bash

# Tell chifra we're running in docker
export DOCKER_MODE=true

# index_chain() starts scraper of the given chain, reading arguments and file
# content from env variables (optional).
index_chain() {
    CHAIN_NAME=`echo $1 | tr '[:upper:]' '[:lower:]'`
    CHAIN_VAR=$1

    args_varname="SCRAPER_${CHAIN_VAR}_ARGS"
    file_varname="SCRAPER_${CHAIN_VAR}_FILE"

    ARGS="${!args_varname}"
    FILE="${!file_varname}"
    LOCALFILE="/tmp/scraper-$RANDOM"

    echo "Starting index scraper for chain $CHAIN_NAME"
    echo "  With arguments: '$ARGS'"
    if [ -z "$FILE" ]
    then
        echo "  And no command file"
    else
        echo "  And command file saved as $LOCALFILE"
    fi

    echo "${FILE}" > $LOCALFILE
    chifra scrape indexer $ARGS --file $LOCALFILE &
}

# Run `chifra init` in the background if we want to bootstrap
# There seems to be a bug that prevents chifra init -all from running before chifra init
if [ "${BOOTSTRAP_BLOOM_FILTERS:-true}" = true ] ; then
    if [ "${BOOTSTRAP_FULL_INDEX:-false}" = true ] ; then
        echo "Downloading bloom filters AND full index in the background"
        chifra init && chifra init --all
    else
        echo "Downloading bloom filters in the background"
        chifra init
    fi
fi

# Run scraper if enabled
if [ "${RUN_SCRAPER:-true}" = true ] ; then
    # turn all TB_CHAINS_[CHAIN]_CHAINID into a list of space-separated [chain] chain names
    CHAINS=`env | grep TB_CHAINS_.*_CHAINID | sed -E 's/TB_CHAINS_(.*)_CHAINID.*/\1/g'`
    for CHAIN in ${CHAINS}
    do
        index_chain $CHAIN
    done
fi

# Run chifra serve
chifra serve --port 0.0.0.0:${SERVE_PORT:-8080} --verbose ${SERVE_VERBOSITY:-10}
