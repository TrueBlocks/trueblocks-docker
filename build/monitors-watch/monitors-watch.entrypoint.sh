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

chifra monitors --watch $MONITORS_WATCH_ARGS --file /tmp/monitors_watch
