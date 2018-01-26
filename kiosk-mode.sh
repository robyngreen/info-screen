#!/bin/bash
cd /home/pi/apps/info-screen
npm run build && NODE_ENV=production node server.js infoscree < /dev/null &
# Pause for 30 seconds before starting the browser.
sleep 30
chromium-browser --ignore-certificate-errors --disable-sync --disable-restore-session-state --noerrdialogs --disable-session-crashed-bubble --disable-infobars --kiosk --incognito http://localhost:3000
