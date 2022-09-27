#!/bin/bash

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
