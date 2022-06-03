#!/bin/bash

# Tell chifra we're running in docker
export DOCKER_MODE=true

# Locations of config files
CONFIG_FILE=/root/.local/share/trueblocks/trueBlocks.toml

echo "Environment:"
env

echo "Testing..."

# Because C++ code used by chifra status always returns success,
# we will use anonymous pipe to grep stderr and check if there are
# any strings containing "error". Grep with -c option will return
# the count of matched strings, so we can use it as our exit code
ERRORS=`chifra status --terse &> >(grep -ci 'error\|Quitting')`
if [ "$ERRORS" -gt 0 ]
then
    echo "Errors detected"
else
    echo "Done"
fi

exit $ERRORS
