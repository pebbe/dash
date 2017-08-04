
dist: dist/nl/scripts/app-bundle.js

devel: scripts/app-bundle.js

run:
	au run --watch

scripts/app-bundle.js: src/*
	au build --env prod

dist/nl/scripts/app-bundle.js: i18n/nl.json
	make -C tools
	./builddist.bash

i18n/nl.json: index.html scripts/app-bundle.js
	make -C tools
	tools/i18n < i18n/nl.json index.html scripts/app-bundle.js > i18n/nl.json.tmp && mv i18n/nl.json.tmp i18n/nl.json
