
dist: dist/en/index.html

devel: devel/en/index.html

dist/en/index.html: devel/en/index.html
	./builddist.bash

devel/en/index.html: \
		tools/builder \
		tools/translate \
		src/globals/* \
		src/pages/* \
		src/parts/* \
		src/i18n/*.json \
		src/static/* \
		src/bin/*
	./builddevel.bash

tools/builder: tools/builder.go
	make -C tools builder

tools/translate: tools/translate.go
	make -C tools translate
