# TrueBlocks Docker

<img src="https://avatars1.githubusercontent.com/u/19167586?s=200&v=4" width="50px" />

## Table of Contents
  - [Introduction](#introduction)
  - [Prerequisite](#prerequisite)
  - [Configuration](#configuration)
  - [Building](#building)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [List of Contributors](#contributors)
  - [Contact](#contact)

## Introduction

---
The TrueBlocks docker version allows you to run our backend in a docker container. This will allow you to create an index of 'every appearance of every address anywhere on the chain.'

With this index, your node software (i.e., [Erigon](https://github.com/ledgerwatch/erigon)) becomes an true Ethereum data server. With such a server, you can build truely distributed applications (trueDapps). TrueDapps are completely trust-less, perfectly private, use immutably data naturally, and participate without effort (by the user) in a shared, distributed application environment.

## Prerequisite

---
In order to TrueBlocks Docker to work, it must have access to an RPC endpoint with Parity tracing enabled. Erigon, works this way by default.

There are commercially available offerings, but we find these inadequate because of the way TrueBlocks 'hits' the server. Erigon is easy to install, very fast syncing, and blazingly fast at serving data -- if you have an index and know what to ask for. Another great solution is running both Erigon and TrueBlocks on [dAppNode](https://github.com/dappnode) or [Avado](#).

The docker build environment is also required.

## Configuration

---
We try to make Docker version as easy to configure as possible. This is why it is possible to configure both `chifra` (running inside the container) and the build.

### Configuring `chifra`

---
Because `chifra` supports multiple configuration items, it is best to store them in a file. There is an example file, `env.example`, in this repository and if you choose to name your file `.env`, it will be ignored by Git.

#### Required settings

|Item|Default value|Description|
|----|-------------|-----------|
|TB_CACHEPATH|`/cache`|Path to TrueBlocks' cache|
|TB_INDEXPATH|`/index`|Path to TrueBlocks' index|
|TB_DEFAULTCHAIN|`mainnet`|Chain to use if `--chain` option is not supplied|
|TB_CHAINS_MAINNET_CHAINID|`1`|Chain ID (for a chain called `mainnet`)|
|TB_CHAINS_MAINNET_RPCPROVIDER|`localhost:8545`|RPC provider URL|
|TB_CHAINS_MAINNET_SYMBOL|`ETH`|Token symbol for a chain called `mainnet`|
|TB_CHAINS_MAINNET_PINGATEWAY|`https://ipfs.unchainedindex.io/ipfs/`|Unchained Index pin gateway|
|TB_CHAINS_MAINNET_LOCALEXPLORER|`http://localhost:1234`|URL of the local explorer (TrueBlocks Explorer)|
|TB_CHAINS_MAINNET_REMOTEEXPLORER|`https://etherscan.io`|Remote explorer URL|

#### Optional settings

|Item|Default value|Description|
|----|-------------|-----------|
|RUN_SCRAPER|`true`|Whether or not to run the scraper|
|SCRAPER_ARGS|*empty*|Command line arguments passed to scraper|
|SCRAPER_FILE|*empty*|Contents of a file with scraper arguments|
|BOOTSTRAP_BLOOM_FILTERS|`true`|If `true`, the container will run `chifra init` downloading bloom filters|
|BOOTSTRAP_FULL_INDEX|`true`|If `true`, `chifra init` will download full index|
|TB_ETHERSCAN_KEY|*empty*|Your Etherscan API key|

You can add more chains to `chifra` by specifying configuration for them in the format:
`TB_CHAINS_[chain name]_[configuration item]`, for example `TB_CHAINS_GNOSIS_SYMBOL=xDai`.

### Configuring the build

There are two build arguments right now.
1. `UPSTREAM_VER`: source code branch to build `chifra` from (default: `master`)
2. `SERVE_PORT`: port that `chifra serve` should bind to (default: `8080`)

Use `docker build [...] --built-arg X=Y` to change the defaults (see [Docker documentation](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables---build-arg)).

## Building

---
1. Build the docker image (example tagged with `latest`)

  ```bash
  docker build ./build --tag=trueblocks-core:latest
  ```

2. Run the container

  ```bash
  # By default, both scraper and chifra serve (API server) are started
  docker run \
    --name trueblocks-core \
    --env-file ./.env \
    --publish 8080:8080 \
    --mount type=bind,source=/Volumes/IndexCache/trueblocks/cache,target=/cache \
    --mount type=bind,source=/Volumes/IndexCache/trueblocks/unchained,target=/index \
    trueblocks-core:latest

  # Try to connect to the container
  curl localhost:8080/status
  ```

## Testing
To test the image, run `test.sh` script. This script will build a container and try to call `chifra status --terse` checking for any errors and returning the right error code (`0` when no errors, error count otherwise).
For testing purposes a different entrypoint is used: `build/test/core-test.entrypoint.sh`.

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
