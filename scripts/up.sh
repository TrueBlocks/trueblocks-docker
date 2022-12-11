#!/bin/bash

# Starts the containers defined in docker-compose.yml and docker-compose.local.yml

docker compose -f docker-compose.yml -f docker-compose.local.yml up