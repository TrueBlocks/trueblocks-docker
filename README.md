# TrueBlocks Docker

<img src="https://avatars1.githubusercontent.com/u/19167586?s=200&v=4" width="50px" />

## Table of Contents
  - [Introduction](#introduction)
  - [Prerequisite](#prerequisite)
  - [Building](#building)
  - [Contributing](#contributing)
  - [List of Contributors](#contributors)
  - [Contact](#contact)

## Introduction

The TrueBlocks docker version allows you to run our backend in a docker container. This will allow you to create an index of 'every appearance of every address anywhere on the chain.'

With this index, your node software (i.e., [Erigon](https://github.com/ledgerwatch/erigon)) becomes an true Ethereum data server. With such a server, you can build truely distributed applications (trueDapps). TrueDapps are completely trust-less, perfectly private, use immutably data naturally, and participate without effort (by the user) in a shared, distributed application environment.

## Prerequisite

In order to TrueBlocks Docker to work, it must have access to an RPC endpoint with Parity tracing enabled. Erigon, works this way by default.

There are commercially available offerings, but we find these inadequate because of the way TrueBlocks 'hits' the server. Erigon is easy to install, very fast syncing, and blazingly fast at serving data -- if you have an index and know what to ask for. Another great solution is running both Erigon and TrueBlocks on [dAppNode](https://github.com/dappnode) or [Avado](#).

The docker build environment is also required.

## Building

This repo contains a `Dockerfile` which serves as an example for you.

1. Build the docker image (example tagged with `latest`)

  ```bash
  docker build . --tag=trueblocks-core:latest
  ```

2. Run chifra from the container

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

## Contributing

---
We love contributors. Please see information about our [work flow](./docs/BRANCHING.md) before proceeding.

1. Fork this repository into your own repo.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make changes to your local branch and commit them to your forked repo: `git commit -m '<commit_message>'`
4. Push back to the original branch: `git push origin TrueBlocks/trueblocks-core`
5. Create the pull request.

## Contributors

---
Thanks to the following people who have contributed to this repo:

* [@tjayrush](https://github.com/tjayrush)
* [@MysticRyuujin](https://github.com/MysticRyuujin)
* [@dszlachta](https://github.com/dszlachta)
* [@wildmolasses](https://github.com/wildmolasses)

## Contact

---
If you have specific requests, contact us here <info@quickblocks.io>.
