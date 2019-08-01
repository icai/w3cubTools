export:
	npm run build
	npm run export
	cp ./CNAME out/
	cp ./.nojekyll out/

commit:
	cd out
	git init
	git add -A
	git commit -m "init"
	git branch -m gh-pages
	git remote add origin git@github.com:w3cub/w3cubTools-alpha.git
	git push -f origin gh-pages

