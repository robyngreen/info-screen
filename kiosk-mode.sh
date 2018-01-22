#!/bin/bash
cd /home/pi/apps/info-screen
node server.js infoscreen < /dev/null &
sleep 120
chromium-browser --ignore-certificate-errors --disable-sync --disable-restore-session-state --noerrdialogs --disable-session-crashed-bubble --disable-infobars --kiosk --incognito http://localhost:3000
