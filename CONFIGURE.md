## Configuring this docker image

It's possible to config both the build process to create this docker image as well as how the TrueBlocks executable (called `chifra`) works internally. Both of these possibilities is described below.

### Configuring the build

There are two build arguments you may configure before building the image:

1. `UPSTREAM_VER`: source code branch to build `chifra` from (default: `master`)
2. `SERVE_PORT`: port that `chifra serve` should bind to (default: `8080`)

You may invoke the build process with `docker build [...] --build-arg X=Y` to modify these settings. (See [Docker documentation](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables---build-arg)).

**A quick note on SERVE_PORT:** Distinguish the internal port used by chifra inside the running container from the port exposed to the host machine. See the comments in the `docker-compose.yml` file information on exposing an external port in the event that the port is already in use on the host machine. The setting here is for the port internal to the docker image.

### Configuring `chifra`

In addition to customizing the way the image is built, you may customize the way `chifra` works internally to the image.

`chifra` supports multiple configuration items. Store these customizations in a local file to this folder called `.env`. Copy the example file (`env.example`) to `.env` and adjust values there. Using the name `.env` will ensure any private information in this file won't be pushed to GitHub, as the file is ignored by the `.gitignore` file.

#### Primary settings

Each of these values defaults to settings for mainnet, if you have a locally running RPC provider at :8545, this should just work. It's likely, though,
that you will have to specify at least the RPC Provider setting. The other values should work without modification.

| Item                             | Default                                | Description                                      | Required |
| -------------------------------- | -------------------------------------- | ------------------------------------------------ | -------- |
| TB_SETTINGS_DEFAULTCHAIN         | `mainnet`                              | Chain to use if `--chain` option is not supplied |          |
| TB_CHAINS_MAINNET_RPCPROVIDER    | `localhost:8545`                       | RPC provider URL                                 | yes      |
|                                  |                                        |                                                  |          |
| TB_CHAINS_MAINNET_CHAINID        | `1`                                    | Chain ID (for a chain called `mainnet`)          |          |
| TB_CHAINS_MAINNET_SYMBOL         | `ETH`                                  | Token symbol for a chain called `mainnet`        |          |
| TB_CHAINS_MAINNET_PINGATEWAY     | `https://ipfs.unchainedindex.io/ipfs/` | Unchained Index pin gateway                      |          |
| TB_CHAINS_MAINNET_REMOTEEXPLORER | `https://etherscan.io`                 | Remote explorer URL                              |          |
| TB_CHAINS_MAINNET_LOCALEXPLORER  | `http://localhost:1234`                | URL of the local explorer (TrueBlocks Explorer)  |          |

The words `MAINNET` and `mainnet` above may be replaced for different chains, however you will have to customize additional settings. SEPOLIA
and GNOSIS are actively indexed by TrueBlocks, LLC, and you may use them directly (assuming you have associated RPC endpoints).

You may adjust these values for your chain. SEPOLIA and GNOSIS are being actively indexed by us, and you can simply use them (assuming you have an associated RPC endpoint). If you wish to index you're own chain, you must provide the above values.

We're working on a configuration tool that will make this setup easier, but in the meantime, you will find information on running against different
chains here: [NOT READY-Not ready yet](./).

#### Optional settings

Additional things you may wish to customize, along with their default values are summarize here:

| Item                     | Default | Description                                                               | Use                      |
| ------------------------ | ------- | ------------------------------------------------------------------------- | ------------------------ |
| RUN_SCRAPER              | `true`  | Whether or not to run the scraper                                         | starts the index scraper |
| BOOTSTRAP_BLOOM_FILTERS  | `true`  | If `true`, the container will run `chifra init` downloading bloom filters |                          |
| BOOTSTRAP_FULL_INDEX     | `true`  | If `true`, `chifra init` will download full index                         |                          |
|                          |         |                                                                           |                          |
| SCRAPER_MAINNET_ARGS     | *empty* | Command line arguments passed to scraper                                  | custom options           |
| SCRAPER_MAINNET_FILE     | *empty* | Contents of a file with scraper arguments                                 |                          |
| MONITORS_WATCH_ARGS      | *empty* | Command line arguments passed to `monitors --watch`                       |                          |
| MONITORS_WATCH_FILE      | *empty* | Contents of a file with `monitors --watch` arguments                      |                          |
|                          |         |                                                                           |                          |
| TB_SETTINGS_ETHERSCANKEY | *empty* | Your Etherscan API key                                                    | TODO: this is wrong      |

You may configure different scrapers for different chains in a similar way. By default, the core container starts one scraper per chain
as specified with the `TB_CHAINS_[chain name]_CHAINID` values found in this file. If variables `SCRAPER_[chain name]_ARGS` and/or
`SCRAPER_[chain name]_FILE` are present, they will be used as arguments when starting `chifra scrape`.
