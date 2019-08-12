This program generates api code and documentation.

It parses a shared csv from trueblocks-core and transforms it into...

- plaintext parameter descriptions for the API documentation.
- a javascript object that gets used in the API code.

Example usage:

```sh
cd template-parser
bash run.sh
```

Note: The docs html is generated via the [aglio renderer](https://github.com/danielgtaylor/aglio) which requires node v8.x and under. Therefore, a node version manager like [nvm](https://github.com/nvm-sh/nvm) is recommended. 
