export:
	npm run build
	npm run export
	cp ./CNAME out/
	cp ./.nojekyll out/
	cp ./robots.txt out/
	npm run sitemap
deploy:
	npm run deploy

