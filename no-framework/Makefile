
dist: dist/en/index.html

devel: devel/en/index.html

dist/en/index.html: devel/en/index.html
	./builddist.bash

devel/en/index.html: \
		tools/builder \
		tools/translate \
		src/app.* \
		src/pages/* \
		src/parts/* \
		src/i18n/en.json \
		src/i18n/nl.json \
		src/imports/* \
		src/static/*.* \
		src/static/bin/* \
		src/static/data/* \
		src/static/img/*
	node_modules/.bin/eslint -c src/.eslintrc.json src/*/*.js
	./builddevel.bash

src/i18n/nl.json: \
		tools/i18n \
		src/app.* \
		src/pages/* \
		src/parts/*
	tools/i18n < src/i18n/nl.json \
		src/app.* \
		src/pages/* \
		src/parts/* > src/i18n/nl.json.tmp && \
			mv src/i18n/nl.json.tmp src/i18n/nl.json

tools/builder: tools/builder.go
	make -C tools builder

tools/i18n: tools/i18n.go
	make -C tools i18n

tools/translate: tools/translate.go
	make -C tools translate
