#/bin/bash

set -o allexport
source .env.malagu.local set
set +o allexport

malagu deploy -m fc -s
