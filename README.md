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
- [Locally running RPC endpoints](#locally-running-rpc-endpoints)
- [Configuration](#configuration)
- [Running the tool](#running-the-tool)
  - [Using the API](#using-the-api)
  - [Using `chifra`](#using-chifra)
- [The unchained index](#the-unchained-index)
- [Data science](#data-science)
- [Quick Alternative Method to Start the Container](#quick-alternative-method-to-start-the-container)
- [Other](#other)

## Introduction

TrueBlocks is a local-first indexing / data access solution that you may use for data science or as a locally-running backend for your Web 3.0 projects.

This docker repo is intentionally minimal. See [the core repo](https://github.com/TrueBlocks/trueblocks-core) for more information about the Unchained Index, chifra (our command-line tool), and the TrueBlocks data API.

This repo is pre-alpha and comes with no warranty implied or otherwise. Use at your own discretion.

## Requirements

`docker` and `docker-compose-plugin` are required.

**Note:** this repo uses the Compose Plugin which uses the `docker compose` syntax NOT the Compose Standalone which uses `docker-compose`.

## Locally running RPC endpoints

While TrueBlocks and chifra work with remote RPC endpoints, it is highly recommended that you have you own locally running endpoints. An excellent way to do that is to run Erigon on a `dAppNode`.

If you use a shared, rate-limited endpoint such as the many RPC-for-a-service offerings, there is a high likelihood that you will be rate limited. Because TrueBlocks was designed for direct-to-local-endpoint use cases, such rate limiting is not currently in the code.

Just so that you're aware.

## Configuration

To get started, create a file called `.env` in this folder. An [env.example](env.example) file explaining each setting is provided to help you. Adjust the RPC provider to point to a (preferably local) RPC endpoint.

```[shell]
TB_SETTINGS_DEFAULTCHAIN=mainnet
TB_CHAINS_MAINNET_RPCPROVIDER=http://host.docker.internal:8545
TB_KEYS_ETHERSCAN_APIKEY=<your-key>
TB_SETTINGS_CACHEPATH=/cache
TB_SETTINGS_INDEXPATH=/unchained
```

The `ETHERSCAN_APIKEY` key is optional, but useful to enable the articulation feature.

## Running the tool

1. Make sure your `.env` file is configured [Configuration](#configuration)

2. Create two folders on your host machine to persist the Unchained Index and binary caches:

```[shell]
mkdir -p /Users/user/Data/cache
mkdir -p /Users/user/Data/unchained
```

**Note:** Adjust these paths appropriately for your machine.

3. Replace the `source` paths in `docker-compose.yml` with the paths you just made in step 2.

```yml
...
    volumes:
      - type: bind
        source: /Users/user/Data/cache       <--- REPLACE THIS WITH YOUR PATH
        target: /cache
      - type: bind
        source: /Users/user/Data/unchained   <--- REPLACE THIS WITH YOUR PATH
        target: /unchained
...
```

3. Run `docker compose up`


### Using the API

Both methods start the [TrueBlocks API server](https://trueblocks.io/api/). Leave this process running and open a new terminal window.

Use `curl` to access the API through [http://localhost:8080](http://localhost:8080). For example, the command

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

## The unchained index

In the future, this docker will initialize and maintain [the Unchained Index](https://trueblocks.io/papers/2022/file-format-spec-v0.40.0-beta.pdf). Until then, you must initialize it and maintain it yourself.

Before doing that, please [read and understand this discussion](https://trueblocks.io/docs/install/get-the-index/). It will have an important impact on how `chifra` works for you.

Once you've read the above, run one of the following two commands:

```[shell]
# If you want to initialize the full index (recommended if you have space), or
./scripts/chifra.sh init --all

# If you want a minimal index and don't mind slower initial queries
./scripts/chifra.sh init

# Do not run both commands, chose one or the other
```

Depending on your connection, the above will take several minutes or as much as several hours.

When the initialization finishes, decide if you want to run the `scraper`. The scrape maintains the index to the front of the chain. (Note: if you're exploring older data, this step may be optional.)

To start the scraper, do this only after the `chifra init` command finishes:

```[shell]
./scripts/chifra.sh scrape
```

Allow this process to continue running in its own terminal window or `tmux` session. If you stop it, the next time you run `chifra`, you will have to re-run the scraper to catch up to the chain.

## Data science

`chifra` is an excellent data science tool. See a few of our articles ([here](https://trueblocks.io/tags/community/), [here](https://trueblocks.io/tags/trueblocks/), and [here](https://trueblocks.io/tags/recipes/)) for ideas on how to take advantage of this very useful tool.

TODO: Add tutorials.

## Quick Alternative Method to Start the Container

This alternative uses docker volumes to persist the Unchained Index and binary caches.
This method is great if you plan to always use docker to run chifra or to quickly
try out chifra.

1. Make sure your `.env` file is configured [Configuration](#configuration)

2. Run the command:

```[bash]
docker compose -f docker-compose.yml -f docker-compose.volume-override.yml up
```

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
4. Push back to the original branch: `git push origin TrueBlocks/trueblocks-core`
5. Create the pull request.

**Contact**

If you have questions, comments, or complaints, please join the discussion on our discord server which is [linked from our website](https://trueblocks.io).

**List of Contributors**

Thanks to the following people who have contributed to this project:

- [@tjayrush](https://github.com/tjayrush)
- [@dszlachta](https://github.com/dszlachta)
- [@wildmolasses](https://github.com/wildmolasses)
- [@MysticRyuujin](https://github.com/MysticRyuujin)
