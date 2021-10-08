#!/bin/bash

mkdir -p /var/tmp/dist/tor/etc/tor
cp /etc/tor/torrc /var/tmp/dist/tor/etc/tor/
/usr/tor/tor-browser_en-US/Browser/TorBrowser/Tor/tor &
sleep 1
python3 ./app.py

