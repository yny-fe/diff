#!/bin/bash
# @Author: Just be free
# @Date:   2021-11-01 10:58:15
# @Last Modified by:   Just be free
# @Last Modified time: 2021-11-03 13:42:36

access_token=`cat ./.access-token`

while getopts "C:N:" arg
do
  case $arg in
    C)
      commit=$OPTARG
      ;;
    N)
      project_no=$OPTARG
      ;;
    ?)
      echo "unknown arguments"
      exit 1
      ;;
    esac
done

RESULT=$(curl "https://192.168.48.50/api/v4/projects/$project_no/repository/commits/$commit?private_token=$access_token&ref=master" -X GET --header "content-type:application/json" -k)

echo $RESULT