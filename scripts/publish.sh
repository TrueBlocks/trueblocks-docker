#!/usr/bin/env bash
set -e

# Read version from a file located in the main directory
VERSION=$(cat ${BASH_SOURCE%/*}/../VERSION)

# Call build script
. ${BASH_SOURCE%/*}/build.sh

# Push to Docker Hub
docker push trueblocks/core:$VERSION
