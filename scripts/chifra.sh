#!/bin/bash

# Assuming the docker image is running, call into chifra running in the docker image. Results returned to screen.

ARGS="$@"
docker compose exec core bash -c "chifra $ARGS"