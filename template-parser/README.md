This program parses C++ code and transforms it into plaintext parameter descriptions for the API documentation.

It expects the C++ code to be piped to it.

Example usage:

```sh
cd template-parser
find ../../trueblocks-core/. -name "*.cpp" -exec grep -His "COption(" {} \; | node index.js
```
