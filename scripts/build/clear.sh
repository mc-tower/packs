#!/bin/bash
cd build
rm -f resourcepacks/categories.json
for f in $(find . -name info.json); do
	rm $f
done
