export:
	npm run build
	npm run export
	cp ./CNAME out/
	cp ./.nojekyll out/
	npm run deploy
	npm run sitemap

