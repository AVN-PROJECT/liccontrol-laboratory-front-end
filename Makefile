install:
	npm install && npm install -g npm@latest

run_production: install
	npm run build

run: install
	npm run dev
