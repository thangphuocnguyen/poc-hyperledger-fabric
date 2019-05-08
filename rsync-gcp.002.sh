#!/bin/bash

# rsync -avzP ../enpi-coffee-chain poc-hf-001:/home/dev/EnpiLab/ --delete


rsync --archive \
    --delete \
    --progress \
    --human-readable \
    --exclude node_modules \
    --exclude .DS_Store \
    --exclude temp \
    ../enpi-coffee-chain poc-hf-002:/home/dev/EnpiLab/