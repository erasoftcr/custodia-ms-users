
#!/bin/bash

# Check if docker-compose is installed
if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

# Check if docker-compose.yml exists
if [ ! -f docker-compose.yml ]; then
  echo 'Error: docker-compose.yml not found.' >&2
  exit 1
fi

# Build and run the Docker container
docker-compose up --build

