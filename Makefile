.Phony: start
start:
	cd src && npm run start:firefoxdeveloper 

.Phony: chrome
chrome:
	cd src && npm run start:chrome

.Phony: build
build:
	cd src && npm run build 
