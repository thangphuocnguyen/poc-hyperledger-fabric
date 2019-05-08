'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');
const path = require('path');

const fixtures = path.resolve(__dirname, './../../../../network/');

// A wallet stores a collection of identities
const wallet = new FileSystemWallet('../identity/user/user002-customer/wallet');

async function main() {

    // Main try/catch block
    try {

        // Identity to credentials to be stored in the wallet
        const credPath = path.join(
            fixtures, 
            '/crypto-config/peerOrganizations/org1.enpi.com/users/User2@org1.enpi.com');
        const cert = fs.readFileSync(
            path.join(
                credPath, 
                '/msp/signcerts/User2@org1.enpi.com-cert.pem')).toString();
        const key = fs.readFileSync(
            path.join(
                credPath, 
                '/msp/keystore/208e535d66451ebd31e9d9feeb24060517d884c4dca5f0ff5b97e5b8bb408df4_sk')).toString();

        // Load credentials into wallet
        const identityLabel = 'User2@org1.enpi.com';
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