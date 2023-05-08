up-f:
	docker compose up --build --remove-orphans

up:
	docker compose up -d --build --remove-orphans 

down:
	docker compose down --remove-orphans

shell:
	docker exec -it client-app sh