#!/bin/bash

echo "${MONITORS_WATCH_FILE}" > /tmp/monitors_watch

# TODO: Replace `scrape monitor` with `monitors --watch` when it's merged to core repo

chifra scrape monitors $MONITORS_WATCH_ARGS --file /tmp/monitors_watch