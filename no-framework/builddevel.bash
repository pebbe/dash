#!/bin/bash

rm -fr build
mkdir build
tools/builder `pwd`

rm -fr devel
for langfile in src/i18n/*.json
do
    lang=`basename $langfile .json`
    mkdir -p devel/$lang

    for i in build/*.html build/script.js.in
    do
        tools/translate $langfile < $i > devel/$lang/`basename $i`
    done

    mkdir -p build/$lang/parts
    for i in src/parts/*.js
    do
        tools/translate $langfile < $i > build/$lang/parts/`basename $i`
    done
    node_modules/.bin/browserify devel/$lang/script.js.in > devel/$lang/script.js

    cat src/globals/*.css src/pages/*.css src/parts/*.css | tools/translate $langfile > devel/$lang/style.css

done
cp -a src/bin devel
cp -a src/static devel
cp src/root/*.* devel
