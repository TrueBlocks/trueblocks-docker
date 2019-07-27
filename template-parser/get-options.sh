#!/bin/bash

find ../../trueblocks-core/src/. -name "*.cpp" -exec grep -His "COption(" '{}' ';' | sed 's/..\/..\/trueblocks-core\/src\///'  >misc/exampleInput.txt
