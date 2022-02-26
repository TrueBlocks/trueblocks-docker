# TrueBlocks Docker

<img src="https://avatars1.githubusercontent.com/u/19167586?s=200&v=4" width="50px" />

## Table of Contents
  - [Introduction](#introduction)
  - [Prerequisite](#prerequisite)
  - [Building](#building)
  - [Contributing](#contributing-to-trueblocks)
  - [List of Contributors](#contributors)
  - [Contact](#contact)

## Introduction

TrueBlocks docker allows you to run our backend in a docker container. The backend creates an index of 'every appearance of every address anywhere on the chain.' This turns your node software from a lump of coal into an Ethereum data server that can support true distributed applications that are trust-less and fast.

## Prerequisite

- In order to work to its fullest potential, TrueBlocks requires you to have access to the RPC endpoint of an Ethereum archive/tracing node. There are various commercially available offerings, or much more to our liking, you can run [Erigon](https://github.com/ledgerwatch/erigon). Erigon is easy to install and can be run on your own machine or (more easily) on [dAppNode](https://github.com/dappnode) or [Avado](#).
- A docker build environment is required.

## Building

A `Dockerfile` is included in this repo as an example for creating a Docker image.

1. Build a docker image (example tagged with `latest`)
  ```bash
  docker build . --tag=trueblocks-core:latest
  ```

2. Run chifra from the docker container (Examples:)
  ```bash
  # Running a simple chifra command
  docker run trueblocks-core:latest chifra
  # ...you should get the chifra help screen

  # Mounting your local config, cache, and index folders and running
  # chifra init (assumes chifra is working on host machine)
  docker run \
    -v ./trueblocks:/root/.local/share/trueblocks \
    -v ./cache:/root/.local/share/trueblocks/cache \
    -v ./unchained:/root/.local/share/trueblocks/unchained \
    trueblocks-core:latest chifra init

  # Mounting those same folders and starting the chifra API server
  docker run \
    -v ./trueblocks:/root/.local/share/trueblocks \
    -v ./cache:/root/.local/share/trueblocks/cache \
    -v ./unchained:/root/.local/share/trueblocks/unchained \
    trueblocks-core:latest chifra serve --port 0.0.0.0:8080
  ```

## Contributing to TrueBlocks

---
We love contributors. Please see information about our [work flow](./docs/BRANCHING.md) before proceeding.

1. Fork this repository into your own repo.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make changes to your local branch and commit them to your forked repo: `git commit -m '<commit_message>'`
4. Push back to the original branch: `git push origin TrueBlocks/trueblocks-core`
5. Create the pull request.

## Contributors

---
Thanks to the following people who have contributed to this project:

* [@tjayrush](https://github.com/tjayrush)
* [@dszlachta](https://github.com/dszlachta)
* [@wildmolasses](https://github.com/wildmolasses)
* [@MysticRyuujin](https://github.com/MysticRyuujin)

## Contact

---
If you have specific requests, contact us here <info@quickblocks.io>.

