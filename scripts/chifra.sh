#!/bin/bash

ARGS="$@"
docker compose exec core bash -c "chifra $ARGS"
