#!/bin/bash

# Exit on first error, print all commands.
set -ev

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

docker-compose -f docker-compose.yml down

docker-compose -f docker-compose.yml up \
    -d ca.enpi.com orderer.enpi.com peer0.org1.enpi.com couchdb
docker ps -a

# wait for Hyperledger Fabric to start
# incase of errors when running later commands, issue export FABRIC_START_TIMEOUT=<larger number>
export FABRIC_START_TIMEOUT=10
echo ${FABRIC_START_TIMEOUT}
sleep ${FABRIC_START_TIMEOUT}

# Create the channel
docker exec \
    -e "CORE_PEER_LOCALMSPID=Org1MSP" \
    -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.enpi.com/msp" \
    peer0.org1.enpi.com \
    peer channel create \
    -o orderer.enpi.com:7050 \
    -c channel001 \
    -f /etc/hyperledger/configtx/channel.tx

# Join peer0.org1.enpi.com to the channel.
docker exec \
    -e "CORE_PEER_LOCALMSPID=Org1MSP" \
    -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.enpi.com/msp" \
    peer0.org1.enpi.com \
    peer channel join -b channel001.block
