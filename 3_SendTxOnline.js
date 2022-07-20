import jetpack from "fs-jetpack";
import Web3 from "web3";
import blockchain from "./blockchain.js";

function main() {
    const web3 = new Web3();
    console.log("Web3 Instance Create Complete");

    // 1. Add account for Tx
    blockchain.addAccount(web3);
    // 2. Connect web3 network
    blockchain.connectGanache(web3);

    // 3. Get tx's hash signed in file
    const raw = readFile();
    console.log('raw : ', raw);

    // 4. Send signed tx which transfer eth
    blockchain.sendSignedTx(web3, raw).then(txHash => {
        console.log(txHash);

        // 5. Write tx hash finalized in file
        writeFile(txHash);
    });
}

function readFile() {
    const path = './result/2_serialized_tx.txt';

    const data = jetpack.read(path);
    return data;
}

function writeFile(hash) {
    const path = './result/3_send_tx.txt';
    jetpack.write(path, hash);
}

main()
