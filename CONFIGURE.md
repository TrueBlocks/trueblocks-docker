### Configuring the build

There are two build arguments right now.
1. `UPSTREAM_VER`: source code branch to build `chifra` from (default: `master`)
2. `SERVE_PORT`: port that `chifra serve` should bind to (default: `8080`)

Use `docker build [...] --build-arg X=Y` to change the defaults (see [Docker documentation](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables---build-arg)).
### Configuring `chifra`

`chifra` supports multiple configuration items. It's easiest to store them in a configuration file. There is an example file called `env.example` in this repository. Copy it to `.env` and adjust it's values. Using `.env` will ensure any private information won't be pushed to GitHub as it's ignored by the `.gitignore` file.

#### Suggested settings (plus one required)

| Item                             | Default                                | Description                                      | Required |
| -------------------------------- | -------------------------------------- | ------------------------------------------------ | -------- |
| TB_SETTINGS_DEFAULTCHAIN         | `mainnet`                              | Chain to use if `--chain` option is not supplied |          |
| TB_CHAINS_MAINNET_RPCPROVIDER    | `localhost:8545`                       | RPC provider URL                                 | yes      |
| TB_CHAINS_MAINNET_CHAINID        | `1`                                    | Chain ID (for a chain called `mainnet`)          |          |
| TB_CHAINS_MAINNET_SYMBOL         | `ETH`                                  | Token symbol for a chain called `mainnet`        |          |
| TB_CHAINS_MAINNET_PINGATEWAY     | `https://ipfs.unchainedindex.io/ipfs/` | Unchained Index pin gateway                      |          |
| TB_CHAINS_MAINNET_LOCALEXPLORER  | `http://localhost:1234`                | URL of the local explorer (TrueBlocks Explorer)  |          |
| TB_CHAINS_MAINNET_REMOTEEXPLORER | `https://etherscan.io`                 | Remote explorer URL                              |          |

You may adjust these values for your chain. SEPOLIA and GNOSIS are being actively indexed by us, and you can simply use them (assuming you have an associated RPC endpoint). If you wish to index you're own chain, you must provide the above values.

#### Optional settings

| Item                     | Default | Description                                                               | Use                      |
| ------------------------ | ------- | ------------------------------------------------------------------------- | ------------------------ |
| RUN_SCRAPER              | `true`  | Whether or not to run the scraper                                         | starts the index scraper |
| SCRAPER_MAINNET_ARGS     | *empty* | Command line arguments passed to scraper                                  | custom options           |
| SCRAPER_MAINNET_FILE     | *empty* | Contents of a file with scraper arguments                                 |                          |
| MONITORS_WATCH_ARGS      | *empty* | Command line arguments passed to `monitors --watch`                       |                          |
| MONITORS_WATCH_FILE      | *empty* | Contents of a file with `monitors --watch` arguments                      |                          |
| BOOTSTRAP_BLOOM_FILTERS  | `true`  | If `true`, the container will run `chifra init` downloading bloom filters |                          |
| BOOTSTRAP_FULL_INDEX     | `true`  | If `true`, `chifra init` will download full index                         |                          |
| TB_SETTINGS_ETHERSCANKEY | *empty* | Your Etherscan API key                                                    | TODO: this is wrong      |

You can add more chains to `chifra` by specifying configuration for them in the format:
`TB_CHAINS_[chain name]_[configuration item]`, for example `TB_CHAINS_GNOSIS_SYMBOL=xDai`.

You can configure scrapers for different chains in a similar way. By default, core container will start one scraper per
chain read from `TB_CHAINS_[chain name]_CHAINID`. If variables `SCRAPER_[chain name]_ARGS` and/or `SCRAPER_[chain name]_FILE`
are present, they will be used as arguments and arguments file.

