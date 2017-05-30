#!/usr/bin/env bash
export TD_ENV=test

allTestFiles=$(ls backend/test/*.js)

for thisTest in $allTestFiles
do
    mocha --compilers js:babel-core/register $thisTest
    if [ $? -ne 0 ]; then
        echo "error in test $thisTest"
        exit 1
    fi
done

echo Done!