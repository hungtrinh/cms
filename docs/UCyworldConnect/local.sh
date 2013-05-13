#!/bin/sh
clear
echo change host to local
sudo cp ./Local/hosts /etc/hosts
echo clear dns cache on mac lion
killall -HUP mDNSResponder

