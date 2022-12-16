<!-- markdownlint-disable MD033 MD036 MD041 MD003 MD022 MD024 -->
<h1>TrueBlocks / Docker Version</h1>

![GitHub repo size](https://img.shields.io/github/repo-size/TrueBlocks/trueblocks-docker)
[![GitHub contributors](https://img.shields.io/github/contributors/TrueBlocks/trueblocks-docker)](https://github.com/TrueBlocks/trueblocks-docker/contributors)
[![GitHub stars](https://img.shields.io/github/stars/TrueBlocks/trueblocks-docker?style%3Dsocial)](https://github.com/TrueBlocks/trueblocks-docker/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/TrueBlocks/trueblocks-docker?style=social)](https://github.com/TrueBlocks/trueblocks-docker/network/members)
[![Twitter Follow](https://img.shields.io/twitter/follow/trueblocks?style=social)](https://twitter.com/trueblocks)

**Table of Contents**

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Running the tool](#running-the-tool)
- [The Unchained Index](#the-unchained-index)
- [Other](#other)

## Introduction

This docker version of TrueBlocks is intentionally minimal. Please see [the core repo for information](https://github.com/TrueBlocks/trueblocks-core) about TrueBlocks, the Unchained Index, our command-line tool (`chifra`) and our API. The software is pre-alpha. Use at your own risk.

## Configuration

----
TODO: COMPLETE THIS SECTION


Add these items to `.env`. Adjust the RPC provider to point to the proper port (if you're node is running locally) or the URL if the node is remote. The EtherScan key is optional, but useful.

```[shell]
TB_SETTINGS_DEFAULTCHAIN=mainnet
TB_SETTINGS_CACHEPATH=/cache
TB_SETTINGS_INDEXPATH=/unchained
TB_CHAINS_MAINNET_RPCPROVIDER=http://host.docker.internal:23456
TB_KEYS_ETHERSCAN_APIKEY=<your_key>
```

----
TODO: COMPLETE THIS SECTION


By default, the docker stores the Unchained Index internally to the container. If you wish to store the Unchained Index on your host machine as well, do this:

Create two folders on your host machine. We will attach these folders to the container's `CACHEPATH` and `INDEXPATH` in a moment.

On our machines, we use:

```[shell]
mkdir -p /Users/user/Data/cache
mkdir -p /Users/user/Data/unchained
```

**Note:** Adjust these values appropriately for your machine.

Next, edit a file in the current folder called `docker-compose.local.yml`. Add the following code. (Adjust the paths.)

```[shell]
services:
  core:
    volumes:
      - type: bind
        source: /Users/user/Data/docker/cache
        target: /cache
      - type: bind
        source: /Users/user/Data/docker/unchained
        target: /unchained
```

Notice that the above process attaches the internal-to-docker `target` folders to the external-on-the-host `source` folders. This allows the files created by the Unchained Index to be visible outside of the docker container.
## Running the tool

Assuming you've completed the above instructions, open a new terminal window and start the container with this command:

```[bash]
docker compose -f docker.compose.yml -f docker.compose.local.yml up
```

The above will start the [TrueBlocks API server](https://trueblocks.io/api/). You may now use `curl` to access the server through [http://localhost:8008](http://localhost:8008). For example,

```[shell]
curl "http://localhost:8080/blocks?blocks=1-1000:10"
```

will extract every 10th block between blocks 1 and 1,000. You may also use the `chifra` command line tool directly. From the current folder, type:

```[shell]
./scripts/chifra.sh blocks 1-1000:10
```

This will produce the same results as the command running against the API server.

See the [most recent documentation](https://trueblocks.io/docs/) here.

## The Unchained Index

In the future, this docker will initialize and maintain [the Unchained Index](https://trueblocks.io/papers/2022/file-format-spec-v0.40.0-beta.pdf). Until then, you must initialize it and maintain it manually. Do this by running this command:

```[shell]
./scripts/chifra.sh init --all
```

Depending on your connection, this may take several hours. When it finishes, you may optionally choose to run the scraper which maintains the index at the front of the chain. (Note: if you're exploring older data, this step is optional.)

To start the scraper, do this once the `chifra init` command finishes:

```[shell]
chifra scrape
```

Allow this process to continue running in its own terminal window.

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
