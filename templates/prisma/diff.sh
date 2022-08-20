#/bin/bash

set -o allexport
source .env set
set +o allexport

npx prisma migrate diff --from-url "$DATABASE_URL" --to-schema-datamodel prisma/schema.prisma
