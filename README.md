# TrueBlocks Docker

## Table of Contents
  - [Introduction](#introduction)
  - [Prerequisite](#prerequisite)
  - [Quick start](#quick-start)
  - [Testing](#testing)
  - [Configuration](#configuration)
  - [Building](#building)
  - [Using the container](#using-the-container)
  - [Monitoring addresses](#monitoring-addresses)
  - [Contributing](#contributing)
  - [List of Contributors](#contributors)
  - [Contact](#contact)

## Introduction

The TrueBlocks docker version makes it easy to run the `trueblocks-core` in a docker container.

TrueBlocks builds an index of 'every appearance of every address anywhere on the chain.' The index turns your node software ([Erigon](https://github.com/ledgerwatch/erigon), for example) into a true Ethereum data server. With such a server, you can build truly distributed applications (dApps) running locally on your end users' machines. dApps that are truly trustless and perfectly private. dApps that share among themselves effortlessly and whose data is uncensorable, naturally sharded, and private.

## Prerequisite

In order for this docker version to work, it needs an RPC endpoint. Erigon, is an excellent choice for this and provides both the archive node functionality and the `trace_` namespace TrueBlocks requires.

There are commercially available RPC endpoints, however, we find them inadequate due to excessive cost and significantly slower speed of access. Erigon is easy to install, syncs to the tip of the chain very quickly, and is blazingly fast at serving data -- if one has an index. A great "devops" solution to running both Erigon and TrueBlocks is the [dAppNode project](https://github.com/dappnode).

A [docker build environment](https://docs.docker.com/get-docker/) is also required to build this package.

## Quick start

When properly installed, `trueblocks-docker`:

- builds `trublocks-core`,
- runs `chifra init` to initialize the Unchained Index (this takes a while to complete),
- starts `chifra scrape` (in the background) to actively build the index against the head of the chain,
- starts `chifra serve` (in the background) to serve an API of all `chifra` commands,
- optionally, starts `chifra monitors --watch` (in the background) to monitor a collection of addresses.

### Getting started

Copy the `env.example` file to `.env` and modify values (see the comments in the `env.example` for more details), or just do:

```bash
echo "TB_CHAINS_MAINNET_RPCPROVIDER=http://yourRpcEndpoint:port" >.env
docker compose up
```

Make sure to provide a valid RPC endpoint that exposes both an archive node and the `trace_` namespace. If you experience problems, you 
may find useful answers in the comments of the `docker-compose.yml` and `docker-compose.local.example` files.

### Running against other chains

If you want to run against other EVM-compatible chains, edit a file in the local folder called `.env` (or copy the `env.example` file first) and add these items:

```bash
TB_SETTINGS_DEFAULTCHAIN="<chain_name>"
TB_CHAINS_`<CHAIN_NAME>`_CHAINID="<chain_id>"
TB_CHAINS_`<CHAIN_NAME>`_RPCPROVIDER="<rpc endpoint>"
TB_CHAINS_`<CHAIN_NAME>`_SYMBOL="<currency symbol>"
```

Of course, replace `<chain_name>` with (what else?) your chain's name.

TODO: This is confusing

Note: `MAINNET`, `SEPOLIA` and `GNOSIS` chains are pre-configured and you may use these values and the first two settings alone without further adue.

After configuring for your custom chain, run `docker compose up`.

## Interacting with the container

Once the container is running, you may interact with `chifra` directly from the command line by calling:

```bash
scripts/chifra.sh
```

(This should  produce `chifra`'s help screen.)

Alternatively, you may use the API server, thus:

```bash
curl "localhost:8080/when?blocks=london"
```

## Testing

To test the image, run `test.sh` script. This script builds a container and tries to call `chifra status --terse` checking for any errors and returning the right error code (`0` when no errors, error count otherwise).

For testing purposes a different entrypoint is used: `build/core/test/core-test.entrypoint.sh`.

## Configuration

You may configure both the way the docker image is built and the way `chifra` operates. Doing so is explained in its own page:

- [Configuring the build and/or chifra](CONFIGURE.md)

## Building

There are two ways to build the docker images as described in the [Building section](BUILDING.md)

## Using the container

### Calling the `chifra` command line

You may use `scripts/chifra.sh` to call `chifra` commands inside running core container:

```bash
# Getting the list of available chifra commands
scripts/chifra.sh

# Show the latest block
scripts/chifra.sh when latest

# Export JSON data for every 100th block between blocks 0 and 10,000
scripts/chifra.sh blocks 0-10000:100

# Show all the transactions for a given address (note: you must have initialized the Unchained Index for this work)
scripts/chifra.sh export trueblocks.eth
```

The `scripts/chifra.sh` script calls `docker compose exec` internally, so the above commands are equivalent to:

```bash
docker compose exec core bash -c "chifra"
docker compose exec core bash -c "chifra when latest"
docker compose exec core bash -c "chifra blocks 0-10000:100"
docker compose exec core bash -c "chifra export trueblocks.eth"
```

### Connecting into the chifra API server

By default, the `core` container exposes an API server on port `8080` serving exactly the same routes and options as the `chifra` command line does sub-commands and options. Access the API server with:

```bash
curl -s "http://localhost:8080/when?blocks=latest"
curl -s "http://localhost:8080/blocks?blocks=0-10000:100"
curl -s "http://localhost:8080/export?addrs=trueblocks.eth"
```

## Monitoring addresses

TrueBlocks (via `chira`) allows you to "monitor" a collection or set of addresses. This section describes how to do that:

1. Create a new folder on your host machine's file system. For example,
 
  ```bash
  mkdir ~/Data/monitors/
  ```

2. Put as many Ethereum addresses as you wish in a file called `addresses.tsv` in that folder.

  ```bash
  echo 0x846a9cb5593483b59bb386f5a878fbb2a0d1d8dc  > ~/Data/monitors/addresses.tsv
  echo trueblocks.eth                             >> ~/Data/monitors/addresses.tsv
  echo rotki.eth                                  >> ~/Data/monitors/addresses.tsv
  ```

3. Edit `docker-compose.local.yml` (create it by copying from `docker-compose.local.example` if need be). Specify the path you created above to instruct docker where to pick up the list of monitored addresses and where to drop the results.


```yaml
  monitors:
  volumes:
    # unchanged
    - type: bind
      source: ~/Data/cache
      target: /cache
    # unchanged
    - type: bind
      source: ~/Data/unchained
      target: /unchained
    # HERE
    - type: bind
      source: ~/Data/monitors
      target: /monitors
    # HERE
    - type: bind
      source: ~/Data/monitors/export
      target: /export
```

4. Restart (or run for the first time) the container with `docker compose restart` or `scripts/up.sh`. You should see message in the logs, thus:

  ```
  trueblockscore-monitors-1  | Addresses file found, linking it
  ```

and also the results of the monitoring in the same folder. The monitor service is now watching your addresses.

## Contributing

We love contributors. Please see information about our [work flow](https://github.com/TrueBlocks/trueblocks-core/blob/develop/docs/BRANCHING.md) before proceeding.

1. Fork this repository into your own repo.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make changes to your local branch and commit them to your forked repo: `git commit -m '<commit_message>'`
4. Push back to the original branch: `git push origin TrueBlocks/trueblocks-core`
5. Create the pull request.

## List of Contributors

Thanks to the following people who have contributed to this project:

* [@tjayrush](https://github.com/tjayrush)
* [@dszlachta](https://github.com/dszlachta)
* [@MysticRyuujin](https://github.com/MysticRyuujin)
* [@wildmolasses](https://github.com/wildmolasses)

## Contact

If you have questions, comments, or complaints, please join the discussion on our discord server which is [linked from our website](https://trueblocks.io).
