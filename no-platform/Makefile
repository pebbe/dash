all: \
	clean \
	dist/index.html \
	dist/script.js \
	dist/style.css \
	dist/static/favicon.ico

clean:
	rm -fr dist
	mkdir -p dist

dist/index.html: builder/builder pages/*.html parts/*.html parts/*.js
	mkdir -p work
	builder/builder `pwd`

dist/static/favicon.ico: static/*
	mkdir -p dist/static
	cp static/* dist/static

dist/script.js: work/script.src.js
	mkdir -p dist	
	browserify work/script.src.js > dist/script.js

work/script.src.js: builder/builder parts/*.js
	mkdir -p work
	builder/builder `pwd`

dist/style.css: pages/*.css parts/*.css
	cat pages/*.css parts/*.css > dist/style.css

builder/builder: builder/builder.go
	cd builder && go build -v .
