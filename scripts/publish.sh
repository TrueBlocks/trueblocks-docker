#!/usr/bin/env bash

VERSION=v0.55.0-beta

docker build . --tag trueblocks/core:$VERSION
docker push trueblocks/core:$VERSION
