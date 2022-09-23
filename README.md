# TrueBlocks Docker

## Table of Contents
  - [Introduction](#introduction)
  - [Prerequisite](#prerequisite)
  - [Getting started](#quick-start)
  - [Configuration](#configuration)
  - [Building](#building)
  - [Using the container](#using-the-container)
  - [Monitoring addresses](#monitoring-addresses)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [List of Contributors](#contributors)
  - [Contact](#contact)

## Introduction

The TrueBlocks docker version makes it easy to run the `trueblocks-core` in a docker container.

TrueBlocks builds an index of 'every appearance of every address anywhere on the chain.' With this index, you can use (i.e., [Erigon](https://github.com/ledgerwatch/erigon) or othe node software) as a true Ethereum data server. With such a server, you can build truely distributed applications (dApps). dApps should be completely trustless, perfectly private, use immutably data naturally, and participate without effort (by the user) in a shared, distributed application environment.

## Prerequisite

In order for TrueBlocks docker to work, it needs an RPC endpoint. Erigon, is an excellent choice and provides both an archive node and the `trace_` namespace, both of which are required.

There are commercially available offerings for the same, however, we find these inadequate due to excessive cost and much slower speed. Erigon is easy to install, very fast syncing, and blazingly fast at serving data -- if you have an index. Another great solution is running both Erigon and TrueBlocks on a [dAppNode](https://github.com/dappnode).

A docker build environment is also required.

## Quick Start

When working properly, this docker package:

- builds `trublocks-core`,
- runs `chifra init` to initialize the Unchained Index (this takes a while to complete),
- runs `chifra scrape` (in the background) to actively build the index against the head of the chain,
- runs `chifra serve` (in the background) to serve an API of all `chifra` commands,
- optionally, runs `chifra monitors --watch` (in the background) to monitor a collection of addresses.

### Getting started

Make a backup copy of your `.env` file if you wish to preserve it, then:

```bash
echo "TB_CHAINS_MAINNET_RPCPROVIDER=your-RPC-url-and-port" >.env
docker compose up
```
You may replace `MAINNET` with `SEPOLIA` or `GNOSIS` in the above, as these chains are pre-configured.

For other EVM-compatible chains, edit a file in the local folder called `.env` and add these items:

```bash
TB_CHAINS_`<CHAIN_NAME>`_CHAINID="<chain_id>"
TB_CHAINS_`<CHAIN_NAME>`_RPCPROVIDER="<rpc endpoint>"
TB_CHAINS_`<CHAIN_NAME>`_SYMBOL="<currency symbol>"
```

then

```
docker compose up
```

## Interacting with the container

Once the `chifra` server and API endpoints are running, you may interact with the container.

To call chifra directly from the command line:

```bash
scripts/chifra.sh --help
```

Or through the API server:
```bash
curl "localhost:8080/when?blocks=london"
```

## Configuration

We try to make Docker version as easy to configure as possible. This is why it is possible to configure both `chifra` (running inside the container) and the build.

### Configuring `chifra`

Because `chifra` supports multiple configuration items, it is best to store them in a file. There is an example file, `env.example`, in this repository and if you choose to name your file `.env`, it will be ignored by Git.

#### Required settings

| Item                             | Default value                          | Description                                      |
| -------------------------------- | -------------------------------------- | ------------------------------------------------ |
| TB_SETTINGS_DEFAULTCHAIN         | `mainnet`                              | Chain to use if `--chain` option is not supplied |
| TB_CHAINS_MAINNET_CHAINID        | `1`                                    | Chain ID (for a chain called `mainnet`)          |
| TB_CHAINS_MAINNET_RPCPROVIDER    | `localhost:8545`                       | RPC provider URL                                 |
| TB_CHAINS_MAINNET_SYMBOL         | `ETH`                                  | Token symbol for a chain called `mainnet`        |
| TB_CHAINS_MAINNET_PINGATEWAY     | `https://ipfs.unchainedindex.io/ipfs/` | Unchained Index pin gateway                      |
| TB_CHAINS_MAINNET_LOCALEXPLORER  | `http://localhost:1234`                | URL of the local explorer (TrueBlocks Explorer)  |
| TB_CHAINS_MAINNET_REMOTEEXPLORER | `https://etherscan.io`                 | Remote explorer URL                              |

#### Optional settings

| Item                     | Default value | Description                                                               |
| ------------------------ | ------------- | ------------------------------------------------------------------------- |
| RUN_SCRAPER              | `true`        | Whether or not to run the scraper                                         |
| SCRAPER_MAINNET_ARGS     | *empty*       | Command line arguments passed to scraper                                  |
| SCRAPER_MAINNET_FILE     | *empty*       | Contents of a file with scraper arguments                                 |
| MONITORS_WATCH_ARGS      | *empty*       | Command line arguments passed to `monitors --watch`                       |
| MONITORS_WATCH_FILE      | *empty*       | Contents of a file with `monitors --watch` arguments                      |
| BOOTSTRAP_BLOOM_FILTERS  | `true`        | If `true`, the container will run `chifra init` downloading bloom filters |
| BOOTSTRAP_FULL_INDEX     | `true`        | If `true`, `chifra init` will download full index                         |
| TB_SETTINGS_ETHERSCANKEY | *empty*       | Your Etherscan API key                                                    |

You can add more chains to `chifra` by specifying configuration for them in the format:
`TB_CHAINS_[chain name]_[configuration item]`, for example `TB_CHAINS_GNOSIS_SYMBOL=xDai`.

You can configure scrapers for different chains in a similar way. By default, core container will start one scraper per
chain read from `TB_CHAINS_[chain name]_CHAINID`. If variables `SCRAPER_[chain name]_ARGS` and/or `SCRAPER_[chain name]_FILE`
are present, they will be used as arguments and arguments file.

### Configuring the build

There are two build arguments right now.
1. `UPSTREAM_VER`: source code branch to build `chifra` from (default: `master`)
2. `SERVE_PORT`: port that `chifra serve` should bind to (default: `8080`)

Use `docker build [...] --built-arg X=Y` to change the defaults (see [Docker documentation](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables---build-arg)).

## Building

### Using Docker Compose

The preferred way of building and running TrueBlocks in Docker environment is to use Docker Compose. By default, this will run `chifra serve`, one `chifra scrape` instance per configured chain and `chifra monitors --watch`.
1. Configure `chifra` in a file called `.env` in project's root directory (see [Configuration](#configuration))
2. Create compose file for your environment: `cp docker-compose.local.example docker-compose.local.yml`
3. Edit `docker-compose.local.yml` so that each volume's source points to a location on your hard drive where you would like to store TrueBlocks' index and cache data.
4. Run the project by calling `scripts/up.sh` (which is same as `docker compose -f docker-compose.yml -f docker-compose.local.yml up`)

If you do not want to store TrueBlocks's index and cache outside Docker, you only need to do step 1 and can run the project by simply calling `docker compose up`.

Both `.env` and `docker-compose.local.yml` are ignored by Git.

### Using Docker

1. Build the docker image (example tagged with `latest`)

  ```bash
  docker build ./build/core --tag=trueblocks-core:latest
  ```

2. Run the core container

  ```bash
  # By default, both scraper and chifra serve (API server) are started
  docker run \
    --name trueblocks-core \
    --env-file ./.env \
    --publish 8080:8080 \
    --mount type=bind,source=/your/location/for/cache,target=/cache \
    --mount type=bind,source=/your/location/for/index,target=/index \
    trueblocks-core:latest

  # Try to connect to the container
  curl localhost:8080/status
  ```

3. Run monitor

  ```bash
  docker build ./build/monitors-watch --tag=trueblocks-monitor:latest

  # Note: monitor has to use the same cache and index volumes as core
  # Export volume is optional.
  docker run \
    --name trueblocks-monitor \
    --env-file ./.env \
    --publish 8080:8080 \
    --mount type=bind,source=/your/location/for/cache,target=/cache \
    --mount type=bind,source=/your/location/for/unchained,target=/index \
    --mount type=bind,source=/your/location/for/exports,target=/exports \
    trueblocks-monitor:latest
  ```

## Using the container

### Calling `chifra` directly

You can use `scripts/exec.sh` to call `chifra` commands inside running core container:
```bash
# Getting the list of available commands
scripts/exec.sh --help

# To get every 100th block from the fist block up to 1000th:
scripts/exec.sh blocks 0-1000:100
```

`exec.sh` script uses `docker compose exec` internally, so the above commands are equivalent to:
```bash
docker compose exec core bash -c "chifra --help"

# Or:
docker compose exec core bash -c "chifra blocks 0-1000:100"
```

### Connecting to API server

By default, `core` container exposes API server on port `8080`:
```bash
curl "localhost:8080/when?blocks=london"
```

## Monitoring addresses

1. Create a new directory in your filesystem
  ```bash
  mkdir ~/Projects/monitoring_my_address
  ```
2. Put as many addresses as you like into a text file (one address per line) and save the file as `addresses.tsv` in the directory that you have created in step 1 (**file name matters**)
  ```bash
  echo 0x1db3439a222c519ab44bb1144fc28167b4fa6ee6 > ~/Projects/monitoring_my_address/addresses.tsv
  echo 0xab5801a7d398351b8be11c439e05c5b3259aec9b >> ~/Projects/monitoring_my_address/addresses.tsv
  ```
3. Edit your `docker-compose.local.yml` and use path to the directory created in step 1 as source for `addresses` volume:
  ```yaml
    monitors_watch:
    volumes:
      # unchanged
      - type: bind
        source: ~/Library/Application Support/TrueBlocks/cache
        target: /cache
      # unchanged
      - type: bind
        source: ~/Library/Application Support/TrueBlocks/unchained
        target: /index
      # HERE
      - type: bind
        source: ~/Projects/monitoring_my_address
        target: /addresses
  ```
4. Now run or restart TrueBlocks service by using `docker compose -f ... -f ... up` or `docker compose restart`. You should see this message in the logs:
  ```
  trueblockscore-monitors_watch-1  | Addresses file found, linking it
  ```
  The monitor service will now watch the addresses.

## Testing
To test the image, run `test.sh` script. This script will build a container and try to call `chifra status --terse` checking for any errors and returning the right error code (`0` when no errors, error count otherwise).
For testing purposes a different entrypoint is used: `build/core/test/core-test.entrypoint.sh`.

## Contributing

We love contributors. Please see information about our [work flow](./docs/BRANCHING.md) before proceeding.

1. Fork this repository into your own repo.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make changes to your local branch and commit them to your forked repo: `git commit -m '<commit_message>'`
4. Push back to the original branch: `git push origin TrueBlocks/trueblocks-core`
5. Create the pull request.

## Contributors

Thanks to the following people who have contributed to this repo:

* [@tjayrush](https://github.com/tjayrush)
* [@MysticRyuujin](https://github.com/MysticRyuujin)
* [@dszlachta](https://github.com/dszlachta)
* [@wildmolasses](https://github.com/wildmolasses)

## Contact

If you have specific requests, contact us here <info@quickblocks.io>.
