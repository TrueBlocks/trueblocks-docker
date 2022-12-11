#!/usr/bin/env bash

VERSION=v0.44.0-beta

docker build build/core --tag trueblocks/core:$VERSION
docker push trueblocks/core:$VERSION
