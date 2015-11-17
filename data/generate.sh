#!/bin/sh
./fetch.sh
curl -O https://raw.githubusercontent.com/banksean/jsmarkov/master/markov.js
curl -O https://raw.githubusercontent.com/banksean/jsmarkov/master/probabilityset.js

gunzip -f -k corpora/*.gz

cat probabilityset.js  >> markov.js
echo >> markov.js
echo "exports.Markov = Markov;" >> markov.js

node generate

rm markov.js probabilityset.js
rm corpora/*.txt
