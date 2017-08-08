#!/bin/bash

rm -fr build
mkdir build
tools/builder `pwd`

for i in src/*.less src/pages/*.less src/parts/*.less
do
    echo '/* ' $i ' */' >> build/style.css
    node_modules/.bin/lessc --include-path=./src/imports $i >> build/style.css
done

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
    node_modules/.bin/browserify --debug --outfile devel/$lang/script.js devel/$lang/script.js.in

    tools/translate $langfile < build/style.css > devel/$lang/style.css

done
cp -a src/static/* devel
