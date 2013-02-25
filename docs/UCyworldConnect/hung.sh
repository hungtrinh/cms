#!/bin/sh
sudo cp ./hung/hosts /etc/hosts
sudo /etc/init.d/hostname stop
sudo /etc/init.d/hostname start

