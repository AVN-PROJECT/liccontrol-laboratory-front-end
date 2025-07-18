install:
	npm install && npm install -g npm@latest

prepare:
	npm run prepare

build:
	npm run build

copy_files:
	@echo "Copying dist files..."
	@mkdir -p ./laboratory/dist
	@cp -r /liccontrol-laboratory-front-end/dist/* ./laboratory/dist/ || (echo "Copy failed!" && exit 1)
	@echo "Copied files:"
	@find ./laboratory/dist/ -type f | wc -l | xargs echo "Total files:"
	@du -sh ./laboratory/dist/ | awk '{print "Total size:", $$1}'
	@echo "Target directory contents:"
	@ls -la ./laboratory/dist/

run_production: install prepare build copy_files

run: install prepare
	npm run dev -- --port 5173 --host 0.0.0.0
