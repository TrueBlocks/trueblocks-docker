#!/bin/bash

echo "${MONITORS_WATCH_FILE}" > /tmp/monitors_watch

ADDRESSES_TARGET=/addresses/addresses.tsv
ADDRESSES_LINK=/addresses.tsv

# Create link to addresses file
if [ -f "$ADDRESSES_TARGET" ]
then
    echo "Addresses file found, linking it"
    ln -s "$ADDRESSES_TARGET" "$ADDRESSES_LINK"
fi

CORE_HOST=${CORE_URL:-core}

echo "Will try to reach ${CORE_HOST}:8080"

while :
do
    STATUS=`curl --silent --show-error ${CORE_HOST}:8080/status | jq ".data[].isScraping"`
    if [ "$STATUS" == "true" ]
    then
        echo "Scraper is running, continuing..."
        break
    fi

    echo "Scraper is not running, waiting..."
    sleep 1 # second
done

chifra monitors --watch $MONITORS_WATCH_ARGS --file /tmp/monitors_watch
