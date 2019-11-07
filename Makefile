.PHONY: build build-mewn debug

build-mewn:
	@go build -o build/mewn cmd/mewn/main.go

build:
	@rm -Rf ./build/Production/Notorious.app/
	@mkdir -p ./build/Production/Notorious.app/Contents/MacOS
	@mkdir -p ./build/Production/Notorious.app/Contents/Resources
	@cp ./assets/appicon.icns ./build/Production/Notorious.app/Contents/Resources/
	@cp ./meta/Info.plist ./build/Production/Notorious.app/Contents/
	@echo "Building GUI"
	@cd ./ui && yarn build
	@echo "Building go-application"
	@mewn build -o build/Production/Notorious.app/Contents/MacOS/Notorious
	@echo "Completed."

debug:
	@rm -Rf ./build/Debug
	@echo "Building GUI"
	@cd ./ui && yarn build
	@echo "Building go-application"
	@mewn build -o build/Debug/Notorious
	./build/Debug/Notorious