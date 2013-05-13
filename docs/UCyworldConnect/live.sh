#!/bin/sh
clear 
echo change host to live
sudo cp ./Live/hosts /etc/hosts
echo clear dns cache on mac lion
killall -HUP mDNSResponder

