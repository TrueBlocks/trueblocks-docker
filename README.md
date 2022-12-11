<!-- markdownlint-disable MD033 MD036 MD041 -->
<h1>TrueBlocks / Docker Version</h1>

![GitHub repo size](https://img.shields.io/github/repo-size/TrueBlocks/trueblocks-docker)
[![GitHub contributors](https://img.shields.io/github/contributors/TrueBlocks/trueblocks-docker)](https://github.com/TrueBlocks/trueblocks-docker/contributors)
[![GitHub stars](https://img.shields.io/github/stars/TrueBlocks/trueblocks-docker?style%3Dsocial)](https://github.com/TrueBlocks/trueblocks-docker/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/TrueBlocks/trueblocks-docker?style=social)](https://github.com/TrueBlocks/trueblocks-docker/network/members)
[![Twitter Follow](https://img.shields.io/twitter/follow/trueblocks?style=social)](https://twitter.com/trueblocks)

**Table of Contents**

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Running the container](#running-the-container)
- [Other](#other)

## Introduction

TrueBlocks docker provides a docker version of trueblocks-core. This container is intentionally very minimal.

Please see [the core repo for information](https://github.com/TrueBlocks/trueblocks-core) about TrueBlocks.

This software is pre-alpha. Use at your own risk.

## Configuration

TODO: Edit `.env`

TODO: `docker-compose.local.yml`.

## Running the container

Assuming you've completed the above instructions, start the container with this command from this folder:

```[bash]
docker compose -f docker.compose.yml -f docker.compose.local.yml up
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
