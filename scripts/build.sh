#!/bin/bash

# UPDATE_VERSION_HERE
VERSION=v0.64.0-beta
docker build . --tag trueblocks/core:$VERSION
