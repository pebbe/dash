#!/bin/bash

set -e

rm -fr dist
mkdir dist
for langfile in src/i18n/*.json
do
    lang=`basename $langfile .json`
    mkdir -p dist/$lang
	for i in devel/$lang/*.html
    do
        node_modules/.bin/html-minifier --collapse-whitespace --conservative-collapse --remove-comments -o dist/$lang/`basename $i` $i
    done
	perl -p -e 's!/\*.*?\*/!!gs' devel/$lang/style.css | node_modules/.bin/html-minifier --collapse-whitespace > dist/$lang/style.css
	node_modules/.bin/uglifyjs < devel/$lang/script.js > dist/$lang/script.js
done
cp -a devel/bin dist
cp -a devel/img dist
cp devel/*.* dist
