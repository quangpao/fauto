#!/bin/bash
cd /home/ec2-user/fauto
docker-compose build --no-cache
docker-compose up -d