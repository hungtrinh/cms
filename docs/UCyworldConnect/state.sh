#!/bin/sh
sudo cp -f ./State/hosts /etc/hosts
sudo /etc/init.d/hostname stop
sudo /etc/init.d/hostname start

