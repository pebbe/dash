#!/bin/sh

echo 'Content-type: text/plain; charset=utf-8'
echo

T=/tmp/dash.saveload.`id -u`

cat > $T
echo Opgeslagen: `cat $T`
