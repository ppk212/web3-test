import { exit } from "process";
import Web3 from "web3";
import pkg from '@ethereumjs/tx';
const { Transaction, FeeMarketEIP1559Transaction } = pkg;

function main() {
    const web3 = new Web3('http://localhost:8545');
    console.log("Web3 Instance Create Complete");
    console.log(web3._provider.connected);

    addAccount(web3);
    connectGanache(web3);
    console.log(web3._provider.connected);
    if(!web3._provider.connected) {
        console.log("Web3 Connect Failed!");
        exit(1);
    }

    getNonce(web3, web3.eth.accounts.wallet[0]).then(txCount => {
        console.log(txCount);

        // 1. Web3 Network Disconnection
        // disConnectGanache(web3);

        if(web3._provider.connected) {
            console.log("Web3 Disconnect Failed!");
            exit(1);
        }

        // 2. Tx Create And Sign
        console.log(web3.eth.accounts.wallet.length);
        console.log("TTT");


        // 3. Send Tx
        console.log("TTT");

        // 4. Check Tx Info
        console.log("TTT");


    }).catch(err => {
        console.log("Nonce can be created only On-line!");
    });
    
}

function addAccount(web3) {
    web3.eth.accounts.wallet.add("0x5eadbceddd2445e35d3f9bbe5dcbec3c414c7d95d1822f017c11e5fe35eefe37");
    web3.eth.accounts.wallet.add(web3.eth.accounts.create("").privateKey);
}

async function getNonce(web3, account) {
    return await web3.eth.getTransactionCount(account.address);
}

async function signTx(web3) {
    const sender = web3.eth.accounts.wallet[0];
    const receiver = web3.eth.accounts.wallet[1];

    console.log("------------------------------------------------");
    web3.eth.getTransactionCount(sender.address, (err, txCount) => {

        console.log(txCount);
        web3.eth.signTransaction({
            from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
            gasPrice: "20000000000",
            gas: "21000",
            to: '0x3535353535353535353535353535353535353535',
            value: "1000000000000000000",
            data: ""
        }).then(console.log);

        // const txObject = {
        //     nonce: web3.utils.toHex(txCount),
        //     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        //     gasLimit: web3.utils.toHex(1000000),
        //     to: receiver.address,
        //     // from: sender.address,
        //     value: 1
        // };
        // console.log("txObject",txObject);

        // const tx = new Transaction(txObject);
        // console.log("tx",tx);
        // console.log("sender.privateKey",sender.privateKey);

        // // const privateKey = Buffer.from(sender.privateKey, 'hex');
        // // console.log("privateKey",privateKey);

        // tx.sign(sender.privateKey);
        
        // const serializedTx = tx.serialize();
        // console.log("serializedTx",serializedTx);
        // const raw = '0x' + sendSignedTx.toString('hex');
        // console.log("raw",raw);

    })
    
    // const nonce = web3.eth.getTransactionCount(sender.address)
    // const value = "1000000000000000000000";
    // const gasPrice = await web3.eth.getGasPrice();
    // console.log("gasPrice", gasPrice);
    // const gasLimit = web3.eth.estimateGas({
    //     to: receiver.address,
    //     from: sender.address,
    //     value: value
    // });
    // const txObject = {
    //     nonce: nonce,
    //     gasPrice: gasPrice,
    //     gasLimit: gasLimit,
    //     to: receiver.address,
    //     from: sender.address,
    //     value: value,
    //     data: "TEST"
    // }
    
    // console.log("txObject", txObject);

    
    
    

    // const signTx = await web3.eth.sign("TEST", account.address)

    // console.log("Sign Tx Complete!");
    // console.log(signTx);

    // return signTx;
}

function connectGanache(web3) {
    // web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    // const ttt = web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    // web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));

    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

    console.log(web3._provider.connected)
}

function disConnectGanache(web3) {
    // web3.setProvider("");
}

async function getBalance(web3) {
    const account = web3.eth.accounts.wallet[0];

    return web3.eth.getBalance(account.address)
}

async function sendSignedTx(web3, tx) {
    console.log("sendSignedTx Logic");
    // console.log(tx);

    return web3.eth.sendSignedTransaction(tx.messageHash)
}

main()
