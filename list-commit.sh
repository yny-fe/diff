#!/bin/bash
# @Author: Just be free
# @Date:   2021-11-01 11:48:58
# @Last Modified by:   Just be free
# @Last Modified time: 2021-11-03 13:42:40
access_token=`cat ./.access-token`

while getopts "I:S:U:N:" arg
do
  case $arg in
    I)
      page_index=$OPTARG
      ;;
    S)
      since=$OPTARG
      ;;
    U)
      until=$OPTARG
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

RESULT=$(curl "https://192.168.48.50/api/v4/projects/$project_no/repository/commits?page=$page_index&per_page=100&private_token=$access_token&ref_name=master&since=$since&until=$until" -X GET --header "content-type:application/json" -k)

echo $RESULT