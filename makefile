all:
	@echo type `make build` to build and `make publish` to publish the image

build:
	@./scripts/build.sh

publish:
	@./scripts/publish.sh

update-1:
	@code .
	@echo Edit the value near UPDATE_VERSION_HERE
	@code Dockerfile
	@code `find scripts -exec grep -His UPDATE_VERSION_HERE {} ';' | cut -f1 -d: | sort -u`

update-2:
	@code .
	@echo After publishing to docker, edit the value near UPDATE_DOCKER_BUILD_VERSION
	@code docker-compose.yml

up:
	@docker compose -f docker-compose.yml -f docker-compose.local.yml up
