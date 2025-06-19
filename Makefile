install:
	npm install && npm install -g npm@latest

prepare:
	npm run prepare

run_production: install prepare
	npm run build

run: install prepare
	npm run dev -- --port 5173 --host 0.0.0.0
