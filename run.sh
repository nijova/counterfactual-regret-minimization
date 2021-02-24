#!/bin/sh

tsc index.ts --outDir compiled && node compiled/index.js $1 $2
