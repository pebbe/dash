SRC = nuxt.config.js \
	assets/* \
	components/* \
	layouts/* \
	middleware/* \
	pages/kleiweg/dash/nuxt/* \
	pages/kleiweg/dash/nuxt/home/* \
	plugins/* \
	static/kleiweg/dash/nuxt/* \
	store/*

DST = dist/kleiweg/dash/nuxt/index.html

build: $(DST)

$(DST): $(SRC)
	rm -r dist
	npm run generate

run:
	npm run dev
