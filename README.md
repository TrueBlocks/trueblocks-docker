<!-- markdownlint-disable MD033 MD036 MD041 MD003 MD022 MD024 -->
<h1>TrueBlocks / Docker Version</h1>

![GitHub repo size](https://img.shields.io/github/repo-size/TrueBlocks/trueblocks-docker)
[![GitHub contributors](https://img.shields.io/github/contributors/TrueBlocks/trueblocks-docker)](https://github.com/TrueBlocks/trueblocks-docker/contributors)
[![GitHub stars](https://img.shields.io/github/stars/TrueBlocks/trueblocks-docker?style%3Dsocial)](https://github.com/TrueBlocks/trueblocks-docker/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/TrueBlocks/trueblocks-docker?style=social)](https://github.com/TrueBlocks/trueblocks-docker/network/members)
[![Twitter Follow](https://img.shields.io/twitter/follow/trueblocks?style=social)](https://twitter.com/trueblocks)

**Table of Contents**

- [Introduction](#introduction)
- [Requirements](#requirements)
- [A note on RPC endpoints](#a-note-on-rpc-endpoints)
- [Configuration](#configuration)
- [Running the tool](#running-the-tool)
  - [Using the API](#using-the-api)
  - [Using `chifra`](#using-chifra)
- [The Unchained Index](#the-unchained-index)
- [Data science](#data-science)
- [Tutorials and examples](#tutorials-and-examples)
- [Getting started - quick and dirty](#getting-started---quick-and-dirty)
- [Troubleshooting](#troubleshooting)
- [Other](#other)

## Introduction

TrueBlocks is a local-first indexing / data access solution for EVM blockchains. This makes it very useful for data science or as a locally-running backend for your Web 3.0 applications.

This `docker` repo is intentionally minimal serving as a thin layer over [TrueBlocks Core](https://github.com/TrueBlocks/trueblocks-core). Please see that repo for more information about the Unchained Index, chifra (our command-line tool), and the TrueBlocks data API and SDKs.

This repo is `alpha` software and comes with no warranty implied or otherwise. Use at your own discretion.

## Requirements

`docker` and `docker-compose-plugin` are required. The latest versions of both are suggested.

**Note:** We use the `Compose Plugin` which uses the `docker compose` syntax *NOT* `Compose Standalone` which uses `docker-compose`.

## A note on RPC endpoints

TrueBlocks works with remote RPC endpoints, but we highly recommended that you run your own RPC. An excellent way on a `dAppNode`.

If you must use a shared endpoint, it's likely that our scraper will be rate limited. This will cause the scraper to fail. You may dial down the speed of the scraper with the `--sleep` option, but of course, now you've dialed down the speed. Your call.

## Configuration

To get started, create a file called `.env` in the current folder. An [env.example](env.example) file explaining each setting is provided to help you. Adjust the RPC provider to point to an RPC endpoint.

```[shell]
TB_SETTINGS_DEFAULTCHAIN=mainnet
TB_CHAINS_MAINNET_RPCPROVIDER=http://host.docker.internal:8545
TB_KEYS_ETHERSCAN_APIKEY=<your-Etherscan-api-key>
TB_SETTINGS_CACHEPATH=/cache
TB_SETTINGS_INDEXPATH=/unchained
```

The `ETHERSCAN_APIKEY` key is optional, but useful to enable the articulation feature.

## Running the tool

1. Make sure your `.env` file is configured [Configuration](#configuration)

2. Create two folders on your host machine to persist the Unchained Index and binary caches:

    ```shell
    mkdir -p /Users/user/Data/docker/cache
    mkdir -p /Users/user/Data/docker/unchained
    ```

    **Note:** Adjust these paths appropriately for your machine.

3. Replace the `source` paths in `docker-compose.yml` with the paths you just made in step 2.

    ```yml
    ...
        volumes:
          - type: bind
            source: /Users/user/Data/docker/cache     # <--- REPLACE WITH A VALID PATH
            target: /cache
          - type: bind
            source: /Users/user/Data/docker/unchained # <--- REPLACE WITH A VALID PATH
            target: /unchained
    ...
    ```

4. Run `docker compose up`

Leave this tool running in a separate terminal window. It will start the TrueBlocks API server and the scraper. You should see a note indicating the server URL and the progress of the scraper.

### Using the API

The above commands start TrueBlocks' [API server](https://trueblocks.io/api/). Leave the server running and open a new terminal window.

Use `curl` to test access to the API. For example, the command

```[shell]
curl "http://localhost:8080/blocks?blocks=1-1000:10"
```

will extract every 10th block between blocks 1 and 1,000.

### Using `chifra`

You may also use the `chifra` command line tool directly. From the current folder, type:

```[shell]
./scripts/chifra.sh blocks 1-1000:10
```

This will produce the same results as the `curl` command.

```[shell]
./scripts/chifra.sh --help
```

will show all available chifra tools. See the [full documentation](https://trueblocks.io/docs/) for detailed information.

**Pro user tip:**

You may add the following alias to your shell's init script to make `chifra` available from any command line:

```shell
alias chifra="cd <path>/<to>/trueblocks-docker ; ./scripts/chifra.sh "
```

If you do this, and wish to also run the `core` directly, it may cause a conflict finding `chifra`.

## The Unchained Index

In the future, this docker will initialize and maintain [the Unchained Index](https://trueblocks.io/papers/2022/file-format-spec-v0.40.0-beta.pdf). Until then, you must initialize it and maintain it yourself.

Before doing that, please [read and understand this discussion](https://trueblocks.io/docs/install/get-the-index/). It will have an important impact on how `chifra` works for you.

Once you've read the above, run one of the following two commands:

```shell
# If you want to initialize the full index (recommended if you have space), or
./scripts/chifra.sh init --all

# If you want a minimal index and don't mind slower initial queries
./scripts/chifra.sh init

# Do not run both commands, chose one or the other
```

Depending on your connection, the above will take several minutes or as much as several hours.

When the initialization finishes, decide if you want to run the `scraper`. The scrape maintains the index to the front of the chain. (Note: if you're exploring older data, this step is optional.)

To start the scraper, do this only after the `chifra init` command finishes:

```[shell]
./scripts/chifra.sh scrape
```

Allow this process to continue running in its own terminal window or `tmux` session. If you stop it, the next time you run `chifra`, you will have to re-run the scraper to catch up to the chain.

## Data science

`chifra` is an excellent data science tool. See a few of our articles ([here](https://trueblocks.io/tags/community/), [here](https://trueblocks.io/tags/trueblocks/), and [here](https://trueblocks.io/tags/recipes/)) for ideas on how to take advantage of this very useful tool.

## Tutorials and examples

The core repo has many examples on how to use not only the `chifra` command line, but also the `TrueBlocks API` and the `TrueBlocks SDK`. Please see the [core repo](https://github.com/TrueBlocks/trueblocks-core) for more information. Note that all three methods of using TrueBlocks are compatible with each other. Learn once, use many.

## Getting started - quick and dirty

This alternative method of starting the docker image uses volumes to persist the
Unchained Index and binary caches. It is a great option if you intend only to
use our docker version, if you don't need need the Unchained index files
externally to docker, or if you want to quickly try out chifra.

1. Make sure your `.env` file is configured [Configuration](#configuration)

2. Run this command:

```bash
docker compose -f docker-compose.yml -f docker-compose.volume-override.yml up
```

## Troubleshooting

**Could not load RPC**

If you are running your RPC directly on your host machine (not within a docker container) you may get the message:

```text
Could not load RPC provider: Post "http://localhost:8545": dial tcp 127.0.0.1:8545: connect: connection refused
```

To fix this, tell docker to use your host network by adding `network_mode: "host"` to the `docker-compose.yml`:

```yml
volumes:
  - type: bind
    # The source should match the cache folder you made when getting started
    source: /Users/user/Data/docker/cache
    target: /cache
  - type: bind
    # The source should match the Unchained Index folder you made when getting started
    source: /Users/user/Data/docker/unchained
    target: /unchained
network_mode: "host"
```

**Additional property 'name' is not allowed**

If you get this message, upgrade to the latest version of docker.

## Other

**Documentation**

See the TrueBlocks website for the [most recent documentation](https://trueblocks.io/docs/).

**License**

This software is licensed under [GNU Version 3](https://github.com/TrueBlocks/trueblocks-docker/blob/master/LICENSE).

**Contributing**

We love contributors. Please see information about our [work flow](https://github.com/TrueBlocks/trueblocks-core/blob/develop/docs/BRANCHING.md) before proceeding.

1. Fork this repository into your own repo.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make changes to your local branch and commit them to your forked repo: `git commit -m '<commit_message>'`
4. Push back to the original branch: `git push origin TrueBlocks/trueblocks-docker`
5. Create the pull request.

**Contact**

If you have questions, comments, or complaints, please join the discussion on our discord server which is [linked from our website](https://trueblocks.io).

**List of Contributors**

Thanks to the following people who have contributed to this project:

- [@tjayrush](https://github.com/tjayrush)
- [@dszlachta](https://github.com/dszlachta)
- [@wildmolasses](https://github.com/wildmolasses)
- [@MysticRyuujin](https://github.com/MysticRyuujin)
