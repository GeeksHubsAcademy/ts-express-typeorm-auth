delete-untagged-images:
	sudo docker rmi $(docker images -f "dangling=true" -q)

run-dev-build:
	sudo docker-compose up --build

run-dev:
	sudo docker-compose up

run-prod-build:
	sudo docker-compose -f docker-compose-prod.yml up --build

run-prod:
	sudo docker-compose -f docker-compose-prod.yml up

docker-service-start:
	sudo service docker start

docker-service-stop:
	sudo service docker stop

inside-server-container:
	sudo docker exec -it auth-ts-fsd-server-1 ash
	# ash (Almquist Shell)

ps:
	sudo docker ps

ps-a:
	sudo docker ps -a

images:
	sudo docker images

compose-down:
	sudo docker-compose down
