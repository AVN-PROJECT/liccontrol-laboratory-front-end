install:
	npm install

run_production: install
	npm run build

run: install
	npm run dev
