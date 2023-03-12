#!/bin/bash

VERSION=v0.60.0-beta
docker build . --tag trueblocks/core:$VERSION
