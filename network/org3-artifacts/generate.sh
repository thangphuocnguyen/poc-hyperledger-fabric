#!/bin/bash

echo "Generate Crypto Materials"
./../../toolbox/bin/cryptogen generate --config=./org3-crypto.yaml

echo "Generate Configuration Material"
./../../toolbox/bin/configtxgen -configPath "../org3-artifacts/" -printOrg Org3MSP > ../channel-artifacts/org3.json

