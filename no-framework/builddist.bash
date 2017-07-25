#!/bin/bash

rm -fr dist
mkdir dist
for langfile in src/i18n/*.json
do
    lang=`basename $langfile .json`
    mkdir -p dist/$lang
	for i in devel/$lang/*.html
    do
        node_modules/.bin/html-minifier --collapse-whitespace --remove-comments -o dist/$lang/`basename $i` $i
    done
	perl -p -e 's!/\*.*?\*/!!gs' devel/$lang/style.css | node_modules/.bin/html-minifier --collapse-whitespace > dist/$lang/style.css
	node_modules/.bin/uglifyjs < devel/$lang/script.js > dist/$lang/script.js
	cp -a devel/$lang/bin dist/$lang
	cp -a devel/$lang/static dist/$lang
done
cp devel/*.* dist
