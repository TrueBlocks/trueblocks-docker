This program generates api code and documentation.

It parses a shared csv from trueblocks-core and transforms it into...

- plaintext parameter descriptions for the API documentation.
- a javascript object that gets used in the API code.

Example usage:

```sh
cd template-parser
node index.js -i ../../trueblocks-core/src/other/build_assets/option-master-list.csv
```
