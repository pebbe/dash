#!/bin/bash

set -e

rm -fr dist
mkdir -p dist/scripts
cp -a static/* dist
cp scripts/vendor-bundle.js dist/scripts

for langfile in i18n/*.json
do
    lang=`basename $langfile .json`
    mkdir -p dist/$lang/scripts

    for i in index.html scripts/app-bundle.js
    do
        tools/translate $langfile < $i > dist/$lang/$i
    done
    ln -s ../img/favicon.ico dist/$lang/
    ln -s ../../scripts/vendor-bundle.js dist/$lang/scripts
done
