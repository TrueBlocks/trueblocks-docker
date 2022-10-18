## Building the images

There are two ways to build the docker images in this package described below. The first (building with docker composed) is preferred.

### Building with docker compose

The preferred way of building and running TrueBlocks is by using `docker compose`.

The simplest way to get started is shown above and detailed in the [Configuration section](CONFIGURE.md). However, you may wish to expose the Unchained Index on the host machine. If you wish to do that, you must customize the docker-compose build slightly.

1. Create a file called `.env` in project's root directory (see [Configuration](#CONFIGURE.md)) by copying and editing `env.example`.
2. Create a local configuration copying the example: `cp docker-compose.local.example docker-compose.local.yml`.
3. Edit `docker-compose.local.yml` so that each volume's source points to an external location on your hard drive. The docker container will store the results of its processing there.
4. Run the project by calling `scripts/up.sh` (this simply calls: `docker compose -f docker-compose.yml -f docker-compose.local.yml up`)

If you don't need the Unchained Index or the results of monitoring address on your host machine, you may skip this step and simply run `docker compose up` as described above.

Both the `.env` and `docker-compose.local.yml` are ignored by Git so as to protect your privacy.

### Building with docker directly

1. Build the core docker image directly (for example, against `latest`) with:

  ```bash
  docker build ./build/core --tag=trueblocks-core:latest
  ```

2. You may run the newly built image with:

  ```bash
  # By default, both scraper and chifra serve (API server) are started
  docker run \
    --name trueblocks-core \
    --env-file ./.env \
    --publish 8080:8080 \
    --mount type=bind,source=~/Data/cache,target=/cache \
    --mount type=bind,source=~/Data/unchained,target=/unchained \
    trueblocks-core:latest
```

Note that the above assumes the existence of a folder called `~/Data/`. Create it if it doesn't exist.

Now, you can try to connect to the container:

```
  curl localhost:8080/status
  ```

3. Build and run the monitors (this is an optional step):

  ```bash
  docker build ./build/monitors --tag=trueblocks-monitor:latest

  # Note: monitor has to use the same cache and unchained volumes as core as above
  docker run \
    --name trueblocks-monitor \
    --env-file ./.env \
    --publish 8080:8080 \
    --mount type=bind,source=~/Data/cache,target=/cache \
    --mount type=bind,source=~/Data/unchained,target=/unchained \
    --mount type=bind,source=~/Data/monitors/exports,target=/exports \
    --mount type=bind,source=~/Data/monitors,target=/monitors \
    trueblocks-monitor:latest
  ```
