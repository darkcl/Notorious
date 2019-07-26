.PHONY: build

build:
	@rm -Rf ./build/Notorious.app/
	@mkdir -p ./build/Notorious.app/Contents/MacOS
	@mkdir -p ./build/Notorious.app/Contents/Resources
	@cp ./assets/appicon.icns ./build/Notorious.app/Contents/Resources/
	@cp ./meta/Info.plist ./build/Notorious.app/Contents/
	@echo "Building GUI"
	@cd ./ui && yarn build
	@echo "Building go-application"
	@mewn build -o build/Notorious.app/Contents/MacOS/Notorious
	@echo "Completed."