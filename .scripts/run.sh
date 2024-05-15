#!/bin/bash
cd /home/ec2-user/fauto
aws s3 cp s3://githubenvs/.env .env
docker-compose build --no-cache
docker-compose up -d