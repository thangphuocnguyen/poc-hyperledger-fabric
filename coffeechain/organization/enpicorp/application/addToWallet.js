'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, './../../../../network/');

// A wallet stores a collection of identities
const wallet = new FileSystemWallet('../identity/user/user001/wallet');

async function main() {

    // Main try/catch block
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(
            fixtures, 
            '/crypto-config/peerOrganizations/org1.enpi.com/users/User1@org1.enpi.com');
        
        const cert = fs.readFileSync(
            path.join(
                credPath, 
                '/msp/signcerts/User1@org1.enpi.com-cert.pem')).toString();
        
        const key = fs.readFileSync(
            path.join(
                credPath, 
                '/msp/keystore/d4d41a4901084afa2ceb4f41ec2b924b8469ba70bcd03dcc81a9621456d63889_sk')).toString();

        // Load credentials into wallet
        const identityLabel = 'User1@org1.enpi.com';
        const identity = X509WalletMixin.createIdentity('Org1MSP', cert, key);

        await wallet.import(identityLabel, identity);

    } catch (error) {
        console.log(`Error adding to wallet. ${error}`);
        console.log(error.stack);
    }
}

main().then(() => {
    console.log('done');
}).catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
});