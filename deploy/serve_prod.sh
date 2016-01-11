#!/bin/bash
set -e

### Configuration ###

SERVER=ubuntu@apps.dallasnews.com
APP_DIR=/var/www/tools/pinpoint
KEYFILE=~/.ssh/dmnapps.pem
REMOTE_PATH=/etc/nginx/site-locations/tools/pinpoint


### Library ###

function run()
{
  echo "Running: $@"
  "$@"
}


### Automation steps ###

if [[ "$KEYFILE" != "" ]]; then
  KEYARG="-i $KEYFILE"
else
  KEYARG=
fi

run scp $KEYARG deploy/nginx $SERVER:$REMOTE_PATH
echo
echo "---- Restarting nginx on production server ----"
run ssh $KEYARG -T $SERVER "sudo service nginx restart"