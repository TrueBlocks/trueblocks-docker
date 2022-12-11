#!/bin/bash

CONFIG_FILE=/root/.local/share/trueblocks/trueBlocks.toml

echo "Environment:"
env

echo "Testing..."

ERRORS=`chifra status --terse &> >(grep -ci 'error\|Quitting')`
if [ "$ERRORS" -gt 0 ]
then
    echo "Errors detected"
else
    echo "Done"
fi

exit $ERRORS
