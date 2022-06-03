#!/bin/bash

ENV_FILE=$1

if [ "$ENV_FILE" = "" ]
then
    echo "This script requires env file"
    exit 1
fi

IMAGE=`docker build -q ./build`
docker run -it --rm --env-file $ENV_FILE --entrypoint /root/core-test.entrypoint.sh $IMAGE
RESULT=$?

docker image rm $IMAGE

exit $RESULT