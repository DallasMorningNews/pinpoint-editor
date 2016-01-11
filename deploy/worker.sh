#!/bin/bash
set -e

### Configuration ###

APP_DIR=/var/www/tools/pinpoint
REGISTRY_DIR=/etc/nginx/sites-enabled
GIT_URL=git://github.com/DallasMorningNews/pinpoint-editor
RESTART_ARGS=


### Automation steps ###

set -x

cd $APP_DIR
git pull
npm install --production

cd $REGISTRY_DIR
git pull
sudo service nginx restart

# Restart app
passenger-config restart-app --ignore-app-not-running --ignore-passenger-not-running $RESTART_ARGS $APP_DIR
