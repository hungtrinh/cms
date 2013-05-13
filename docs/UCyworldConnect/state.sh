#!/bin/sh
clear
echo change host to stage
sudo cp -f ./State/hosts /etc/hosts
echo clear dns cache on mac lion
killall -HUP mDNSResponder
