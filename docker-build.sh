#! /bin/bash

docker build -t zhaohuinan/blog-admin .

if [ $? -eq 0 ];then

    docker push zhaohuinan/blog-admin
fi

echo "success";