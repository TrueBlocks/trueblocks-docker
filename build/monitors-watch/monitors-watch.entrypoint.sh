#!/bin/bash

read_configuration_from_tool() {
    config_file=/configuration/configuration.sh

    if [ "${REQUIRE_CONFIGURATION_TOOL}" != true ]
    then
        return
    fi

    while [ ! -f $config_file ]
    do
        echo "No configuration found. Please use TrueBlocks Configuration Tool first."
        echo "Will try to re-read the configuration in 30 seconds"
        sleep 30
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

echo "${MONITORS_WATCH_FILE}" > /tmp/monitors_watch

ADDRESSES_TARGET=/addresses/addresses.tsv
ADDRESSES_LINK=/addresses.tsv

# Create link to addresses file
if [ -f "$ADDRESSES_TARGET" ]
then
    echo "Addresses file found, linking it"
    ln -s "$ADDRESSES_TARGET" "$ADDRESSES_LINK"
fi

CORE_HOST="${CORE_URL:-http://core}:${CORE_PORT:-8080}"

echo "Will try to reach ${CORE_HOST}"

while :
do
    STATUS=`curl --silent --show-error ${CORE_HOST}/status | jq ".data[].isScraping"`
    if [ "$STATUS" == "true" ]
    then
        echo "Scraper is running, continuing..."
        break
    fi

    echo "Scraper is not running, waiting..."
    sleep 1 # second
done

chifra monitors --watch $MONITORS_WATCH_ARGS --file /tmp/monitors_watch
