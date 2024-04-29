#!/bin/bash

# Read version from a file located in the main directory
VERSION=$(cat ${BASH_SOURCE%/*}/../VERSION)

# Build setting the version that we have read
docker build . --build-arg UPSTREAM_VER=$VERSION --tag trueblocks/core:$VERSION
