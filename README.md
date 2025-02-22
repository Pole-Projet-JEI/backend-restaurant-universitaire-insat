# How to run
## Prerequisites
docker
docker-compose

 1. Create a `.env.development` file based on `.env.example` and customize the values as you need
 2. Make sure the specified ports in your env file match the ports in `docker-compose.yaml` if you need to change ports in `docker-compose.yaml` creat a `docker-compose.override.yml` file
 3. `$ docker-compose build`
 4. `$ docker-compose run`
