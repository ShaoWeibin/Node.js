#!bin/sh
if [ ! -f "pid" ]
then
	node ../lib/deamon.js ../config/config.json &
	echo $! > pid
fi