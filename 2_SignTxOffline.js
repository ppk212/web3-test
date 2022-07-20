import jetpack from "fs-jetpack";
import Web3 from "web3";
import blockchain from "./blockchain.js";

function main() {
    const web3 = new Web3();
    console.log("Web3 Instance Create Complete");

    // 1. Add account for Tx
    blockchain.addAccount(web3);

    // 2. Get tx hash(rlp) in file
    const txHash = readFile();
    console.log('txHash : ', txHash);

    // 3. Get network info in file (Option)
    const networkInfo = getNetworkInfoInFile();
    console.log('networkInfo : ', networkInfo)

    // 4. Sign tx which transfer eth
    const hash = blockchain.signTx(web3, txHash, networkInfo)
    console.log('hash : ', hash);

    // 5. Write tx hash in file
    writeFile(hash);
}

function readFile() {
    const path = './result/1_result.txt';
    const data = jetpack.read(path);

    return data;
}

function getNetworkInfoInFile() {
    const path = './result/networkInfo.json';
    const data = jetpack.read(path, "json");

    return data;
}

function writeFile(hash) {
    const path = './result/2_serialized_tx.txt';
    jetpack.write(path, hash);
}

main()
