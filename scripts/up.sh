#!/bin/bash

VERSION=v0.44.0-beta

docker build build/core --tag trueblocks/core:$VERSION
docker compose -f docker-compose.yml -f docker-compose.local.yml up
