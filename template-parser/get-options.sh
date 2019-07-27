#!/bin/bash

find ../../trueblocks-core/src/. -name "*.cpp" -exec grep -His "COption(" '{}' ';' | sed 's/..\/..\/trueblocks-core\/src\///' | grep -v "test-libs" | grep -v "/other" | grep -v "/utillib" | grep -v "/dev_tools"  >misc/exampleInput.txt
