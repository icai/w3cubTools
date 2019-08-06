export:
	npm run build
	npm run export
	cp ./CNAME out/
	cp ./.nojekyll out/
	npm run sitemap
	npm run deploy

