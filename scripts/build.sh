#!/bin/bash

VERSION=v0.50.0-beta
docker build . --tag trueblocks/core:$VERSION
