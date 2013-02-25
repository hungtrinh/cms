#!/bin/sh
sudo cp ./Live/hosts /etc/hosts
sudo /etc/init.d/hostname stop
sudo /etc/init.d/hostname start

