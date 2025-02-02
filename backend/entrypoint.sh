#!/bin/sh

echo "Running prisma migrate deploy..."
npx prisma migrate deploy

echo "Starting NestJS..."
exec node dist/src/main
