
dist: dist/index.html

devel: devel/index.html

dist/index.html: devel/index.html
	rm -fr dist
	mkdir dist
	for i in devel/*.html devel/*.css; do node_modules/.bin/html-minifier --collapse-whitespace --remove-comments -o dist/`basename $$i` $$i; done
	node_modules/.bin/uglifyjs < devel/script.js > dist/script.js
	cp -a devel/static dist

devel/index.html: builder/builder globals/* pages/* parts/* static/*
	rm -fr devel
	mkdir devel
	builder/builder `pwd`
	node_modules/.bin/browserify devel/script.js.in > devel/script.js
	cat globals/*.css pages/*.css parts/*.css > devel/style.css
	cp -a static devel

builder/builder: builder/builder.go
	cd builder && go build -v .
