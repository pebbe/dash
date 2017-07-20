
dist: dist/index.html

devel: devel/index.html

dist/index.html: devel/index.html
	rm -fr dist
	mkdir dist
	for i in devel/*.html;do node_modules/.bin/html-minifier --collapse-whitespace --remove-comments -o dist/`basename $$i` $$i; done
	perl -p -e 's!/\*.*?\*/!!gs' devel/style.css | node_modules/.bin/html-minifier --collapse-whitespace > dist/style.css
	node_modules/.bin/uglifyjs < devel/script.js > dist/script.js
	cp -a devel/bin dist
	cp -a devel/static dist

devel/index.html: builder/builder src/globals/* src/pages/* src/parts/* src/static/* src/bin/*
	rm -fr devel
	mkdir devel
	builder/builder `pwd`
	node_modules/.bin/browserify devel/script.js.in > devel/script.js
	cat src/globals/*.css src/pages/*.css src/parts/*.css > devel/style.css
	cp -a src/bin devel
	cp -a src/static devel

builder/builder: builder/builder.go
	cd builder && go build -v .
