#!/usr/bin/env bash

# This script builds the images and pushes them to docker hub

# tagged version
VERSION=v0.44.0-beta

# Add --no-cache to the build commands to create a fresh build

docker build build/core --tag trueblocks/core:$VERSION
docker push trueblocks/core:$VERSION

# docker build build/monitors --tag trueblocks/monitor:$VERSION
# docker push trueblocks/monitor:$VERSION
