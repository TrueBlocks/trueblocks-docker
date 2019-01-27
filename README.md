# TrueBlocks for dAppNode

![Image Logo](https://avatars1.githubusercontent.com/u/19167586?s=200&v=4)

[![Website trueblocks.io](https://img.shields.io/badge/Website-quickblocks.io-brightgreen.svg)](https://quickblocks.io/)
![Docker](https://img.shields.io/badge/trueblocks-docker-blue.svg)
[![Twitter](https://img.shields.io/twitter/follow/espadrine.svg?style=social&label=Twitter)](https://twitter.com/quickblocks?lang=es)

The dAppNode project answers the "how" question for running an Ethereum node. TrueBlocks answers the "why" question. dAppNode makes setting up and running a node easier. TrueBlocks makes extracting useful data ***from your particular list of accounts*** from that node easier.

## Requirements

- A running Parity Ethereum node with `--tracing on` enabled. You can do this on the  [DNP_ETHCHAIN](https://github.com/dappnode/DNP_ETHCHAIN) package using `EXTRA_OPTS=--tracing on` ([Why do we need --tracing enabled?]())
- An additional 100GB of hard drive space for the TrueBlocks caches.
- Time (it takes a long time to sync the TrueBlocks caches: [why?]()).

## Usage examples

- **You are already running an Parity Ethereum node with `--tracing` enabled:**
    - Start the TrueBlocks docker container with `docker-compose up -d`
    - Wait for TrueBlocks to build its cache. ([Why does this take so long?](wiki/why-is-trueblocks-so-slow))
    - [Query TrueBlocks for a list of transactions on your accounts](wiki/tutorial-querying-for-lists-of-transactions-per-account)
    - Given the list of transactions, [query the node for full JSON details of those transactions](wiki/tutorial-querying-for-lists-of-transactions-per-account)
- **You're not running a node:** Use dAppNode to run a Parity node with tracing enabled. Follow instructions above...
- **You're running geth:** Use dAppNode to run a Parity node with tracing enabled. Follow instructions above...
- **You don't have --tracing enabled:** [Enable --tracing](wiki/enabling-tracing-on-a-dAppNode), resync the node, and follow instructions above...

## Getting Started

### Prerequisites

| component | notes |
|-----------|-------|
| git       | Install the command line tool. [Instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|
| docker    | Install *docker* ([Instructions](https://docs.docker.com/engine/installation)).<br>- The community edition of docker (`docker-ce`) works fine.<br>- On Linux, grant permission to the current user to run docker (`sudo usermod -aG docker $USER`). |
| docker-compose | Install [docker-compose](https://docs.docker.com/compose/install) |

**Note**: Make sure that you are able to run `git`, `docker ps`, `docker-compose` without issue, and that you can do so without using the `sudo` command. ([trouble shooting]())

### Important Note

Building and running the TrueBlocks docker image is taken care of by the dAppNode package manager. The following instructions are presented for those who are not running dAppNode. If you are running a dAppNode, you can simply install the package from the dAppNode package manager.

### Building the Docker Image

Make a local copy of the TrueBlocks docker repo on your machine:

```
$ git clone https://github.com/Great-Hill-Corporation/DAppNodePackage_trueblocks.git
```

Build the docker image:

```
$ docker-compose build
```
or, alternatively:

```
$ docker build --rm -f build/Dockerfile -t dnp_trueblocks:dev build 
```

## Running
### Starting Parity
In order for TrueBlocks to work properly, you need to start parity with at least the following options:

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

### Start the TrueBlocks Docker Image
```
$ docker-compose up -d
```

### Stop
```
$ docker-compose down
```

### Status
```
$ docker-compose ps
```

### Logs
```
$ docker-compose logs -f
```

**Note**: 
There is a time drift issue on Docker for Mac, to solve it try running [Fixing Time drift issue on Docker for Mac](https://blog.shameerc.com/2017/03/quick-tip-fixing-time-drift-issue-on-docker-for-mac):

```
$ docker run --rm --privileged alpine hwclock -s
```

## Contributing

Please read [CONTRIBUTING.md](#) (doesn't exist yet) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **Thomas Jay Rush** - [tjayrush](https://github.com/tjayrush)
* **Ed Mazurek** - [wildmolasses](https://github.com/wildmolasses)

See also the list of [contributors](https://github.com/wildmolasses/DAppNodePackage_trueblocks/contributors) who participated in this project.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details

## References

[git](https://git-scm.com/)

[docker](https://www.docker.com/)

[docker-compose](https://docs.docker.com/compose/)

[TrueBlocks](https://www.quickblocks.io/)
