This program generates api code and documentation.

It parses C++ code from trueblocks-core and transforms it into...

- plaintext parameter descriptions for the API documentation.
- a javascript object that gets used in the API code.

Currently, it expects the C++ code to be piped to it.

Example usage:

```sh
cd template-parser
find ../../trueblocks-core/. -name "*.cpp" -exec grep -His "COption(" {} \; | node index.js
```
