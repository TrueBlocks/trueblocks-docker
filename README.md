# TrueBlocks Indexer on Docker

<i>last updated: 2021-07-03</i>

![Image Logo](https://avatars1.githubusercontent.com/u/19167586?s=200&v=4)

[![Website trueblocks.io](https://img.shields.io/badge/Website-trueblocks.io-brightgreen.svg)](https://trueblocks.io/)
[![Docker](https://img.shields.io/badge/trueblocks-docker-blue.svg)](https://github.com/Great-Hill-Corporation/trueblocks-docker)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Twitter](https://img.shields.io/twitter/follow/espadrine.svg?style=social&label=Twitter)](https://twitter.com/trueblocks?lang=es)

TrueBlocks docker allows you to run our backend in a docker container. The backend creates an index of 'every appearance of every address anywhere on the chain.' This turns your node software from a lump of coal into an Ethereum data server that can support distributed applications that are trustless and fast.

## Prerequisite

- In order to work to its fullest potential, TrueBlocks requires you to have access to the RPC endpoint of an Ethereum archive/tracing node. There are various commercially available offerings, or much more to our liking, you can run [Erigon](https://github.com/ledgerwatch/erigon). Erigon is easy to install and can be run on your own machine or (more easily) on [dAppNode](https://github.com/dappnode) or [Avado](#).
- A docker build environment is required.
- Yarn

## Getting started

```[bash]
git clone -b develop git@github.com:TrueBlocks/trueblocks-docker.git
cd trueblocks-docker
[Edit `trueblocks.local.env using the notes in that file for more information.]
yarn start
```

`yarn start` should build the docker image and start it running. If this is the first time you've used it, it will download a C++ build environment, clone the TrueBlocks backend, and build the entire project. This takes about 30 minutes. Be patient.

The first time the TrueBlocks backend starts, it will download about 1 GB of bloom filters from IPFS. This is an optional task, but greatly speeds up your use of the software. You may disable this option by commenting out the `chifra init &` line in the Dockerfile file. If you do that, it will take about two days for TrueBlocks to build its initial version of the index.

For more information about downloading the index blooms from IPFS vs. building them yourself, please [see our docs](https://docs.trueblocks.io).

## Getting data

The docker portion of TrueBlocks starts an API that gives you easy access to make queries against its index.

Examples:

- Get all JSON exported for specific address:
  - `curl http://localhost:8080/export?address=0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359`
- Get {blockNumber, txIndex} pairs for specific address:
  - `curl http://localhost:8080/list?address=0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359`

---

## The remaining part of this doc is out of date.

---

## Running on DappNode

Building and running the TrueBlocks docker image is taken care of by the dAppNode package manager. If you are running a dAppNode, you can simply install the package from the dAppNode package manager.

Note: your DappNode doesn't run Parity with `--tracing=on` by default. Set `EXTRA_OPTS=--tracing on` in the dappnode admin panel ([image](https://user-images.githubusercontent.com/21328788/52904014-04ab6c00-3226-11e9-8c47-747a42b22169.png)) or setting it in DNP_ETHCHAIN's ethchain.dnp.dappnode.eth.env file (see [Why do we need --tracing enabled?](#why-do-we-need-tracing-enabled))

## FAQ

### I'm running geth, do I need to run Parity instead?

Yes - Parity delivers the necessary articulated traces so that TrueBlocks can build its address index. We don't yet support Geth.

### What is my RPC endpoint?

That depends on how you've configured your parity node. some endpoints that we use are <http://172.17.0.1:8545> (when running node on linux host), <http://docker.for.mac.localhost:8545> (when running node on mac host), and <http://my.ethchain.public.dappnode.eth:8545> (when running node on dappnode). <http://localhost:8545> is a common guess, but docker has its own networking paradigm; don't be surprised if this RPC endpoint choice doesn't yield results.

Parity's default http RPC port is 8545, but your node could be configured differently.

### Why does it take so long to build the index?

TrueBlocks has to manually process every single block in the history of the Ethereum chain. Additionally, it has to descend into every transaction trace. Often, traces are deeply layered (traces of traces of traces of ... traces), and this takes time to 1) fetch from your node's RPC and 2) extract addresses.

### Why do we need tracing enabled?

By visiting every bit of the Ethereum data including blocks, transactions, receipts, logs, traces, trace actions, and trace results for every block, TrueBlocks is able to extract every 'appearance' of an address on the blockchain. TrueBlocks can only do this with a tracing node.

### How do you recommend I run a node?

You can run a node with the [DNP_ETHCHAIN](https://github.com/dappnode/DNP_ETHCHAIN) package - set `EXTRA_OPTS=--tracing on` in the dappnode admin panel or setting it in DNP_ETHCHAIN's ethchain.dnp.dappnode.eth.env file (see [Why do we need --tracing enabled?](#why-do-we-need-tracing-enabled))

Otherwise, in order for TrueBlocks to work properly, you need to start parity with at least the following options:

```
parity --tracing on --jsonrpc-cors all --jsonrpc-hosts all --db-compaction=ssd
```

`--db-compaction=ssd` is optional, but Parity recommends using an SSD drive for storing its data. Enabling `--tracing on` requires a re-sync of your node.

We also recommend (although, this is optional) that you specify an alternative path to store Parity's data (this will also require a re-sync of your node). We suggest an external 4TB SSD.

```
--db-path=/path/to/larger/hard/drive/      ; optionally add to the command line
```

Finally, TrueBlocks works equally with both tracing and archive nodes. You may start Parity as an archive node by adding the following option:

```
--pruning archive                          ; optionally add to the command line
```

(You will definitely want to use a larger hard drive in this case.)

## Troubleshooting

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Thomas Jay Rush** - [tjayrush](https://github.com/tjayrush)
- **Ed Mazurek** - [wildmolasses](https://github.com/wildmolasses)

See also the list of [contributors](https://github.com/Great-Hill-Corporation/trueblocks-docker/contributors) who participated in this project.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details

## References

[git](https://git-scm.com/)

[docker](https://www.docker.com/)

[docker-compose](https://docs.docker.com/compose/)

[TrueBlocks](https://www.trueblocks.io/)
