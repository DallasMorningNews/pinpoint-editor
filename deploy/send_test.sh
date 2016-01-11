#!/bin/bash
set -e

### Configuration ###

SERVER=ubuntu@52.21.39.126
APP_DIR=/var/www/tools/pinpoint
KEYFILE=~/.ssh/dmnapps.pem
REMOTE_SCRIPT_PATH=/tmp/deploy-pinpoint.sh


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

run scp $KEYARG deploy/worker.sh $SERVER:$REMOTE_SCRIPT_PATH
echo
echo "---- Running deployment script on test server ----"
run ssh $KEYARG $SERVER bash $REMOTE_SCRIPT_PATH
