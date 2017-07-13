all: \
	clean \
	dist/index.html \
	dist/script.js \
	dist/style.css \
	dist/index.html \
	dist/static/favicon.ico

clean:
	rm -fr dist work
	mkdir -p dist/static
	mkdir -p work/html
	mkdir -p work/script
	mkdir -p work/style

work/html/index.html: builder/builder pages/*.html parts/*.html parts/*.js
	builder/builder `pwd`

dist/index.html: work/html/index.html
	node_modules/.bin/html-minifier --collapse-whitespace --remove-comments --output-dir=dist --input-dir=work/html

dist/static/favicon.ico: static/*
	cp static/* dist/static

dist/script.js: work/script/script.src.js
	node_modules/.bin/browserify work/script/script.src.js | node_modules/.bin/uglifyjs > dist/script.js

work/script/script.src.js: builder/builder parts/*.js
	builder/builder `pwd`

dist/style.css: globals/*.css pages/*.css parts/*.css
	cat globals/*.css pages/*.css parts/*.css > work/style/style.css
	perl -p -e 's!/\*.*?\*/!!g' work/style/style.css | node_modules/.bin/html-minifier --collapse-whitespace > dist/style.css

builder/builder: builder/builder.go
	cd builder && go build -v .
