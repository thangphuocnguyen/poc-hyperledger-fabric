#!/bin/sh

export PATH=../toolbox/bin:$PATH
export FABRIC_CFG_PATH=${PWD}

# Extend crypto material
echo
echo "##########################################################"
echo "### EXTENDING certificates using cryptogen extend tool ###"
echo "##########################################################"
cryptogen extend --config=./crypto-config.yaml
if [ "$?" -ne 0 ]; then
  echo "Failed to extend crypto material..."
  exit 1
fi
