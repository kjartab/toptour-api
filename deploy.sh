docker-compose -f docker-compose.common.yml -f docker-compose.yml -f docker-compose.prod.yml pull api
docker-compose -f docker-compose.common.yml -f docker-compose.yml -f docker-compose.prod.yml stop api
docker-compose -f docker-compose.common.yml -f docker-compose.yml -f docker-compose.prod.yml up -d api