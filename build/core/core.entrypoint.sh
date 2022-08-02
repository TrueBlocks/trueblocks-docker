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
    chifra scrape indexer --chain $CHAIN_NAME $ARGS --file $LOCALFILE &
}

read_configuration_from_tool() {
    config_file=/configuration/configuration.sh

    if [ "${REQUIRE_CONFIGURATION_TOOL}" != true ]
    then
        return
    fi

    while [ ! -f $config_file ]
    do
        echo "No configuration found. Please use TrueBlocks Configuration Tool first."
        echo "If you are using DAppNode, click Info tab above, then Settings link."
        echo "Will try to re-read the configuration in a few seconds"
        sleep 5
    done

    # Source env file: https://zwbetz.com/set-environment-variables-in-your-bash-shell-from-a-env-file/
    . $config_file
    if [ $? -lt 1 ]
    then
        echo "Configuration has been read successfully"
    else
        echo "Error while reading configuration"
    fi
}

# Read configuration from our configuration tool (only if REQUIRE_CONFIGURATION_TOOL
# is set to true).
read_configuration_from_tool

# Run `chifra init` in the background if we want to bootstrap
# There seems to be a bug that prevents chifra init -all from running before chifra init
if [ "${BOOTSTRAP_BLOOM_FILTERS:-true}" = true ] ; then
    if [ "${BOOTSTRAP_FULL_INDEX:-false}" = true ] ; then
        echo "Downloading bloom filters AND full index in the background"
        chifra init --all
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
