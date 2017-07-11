SRC = nuxt.config.js \
	assets/* \
	components/* \
	layouts/* \
	middleware/* \
	pages/* \
	pages/home/* \
	plugins/* \
	store/*

dist/index.html: $(SRC)
	rm -r dist
	npm run generate

run:
	npm run dev
