#!/bin/bash

mkdir build 2>/dev/null || rm -rf build && mkdir build
cp -r resourcepacks build
node scripts/build/index.mjs
scripts/build/clear.sh
