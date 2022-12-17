#!/bin/bash

VERSION=v0.45.0-beta
docker build . --tag trueblocks/core:$VERSION
