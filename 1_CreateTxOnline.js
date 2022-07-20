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

    // 3. Create tx which transfer eth
    blockchain.createTxForTransferEth(web3).then(txHash => {
        console.log('txHash : ', txHash);
        // 4. Write hash of tx in .txt file
        writeFile(txHash);
        
        // 5. Write network info in network json (Option)
        blockchain.getNetworkInfo(web3).then(networkInfo => {
            console.log('networkInfo : ', networkInfo);

            writeNetworkJson(networkInfo);
        });
    });
}

function writeNetworkJson(networkInfo) {
    const path = './result/networkInfo.json';
    jetpack.write(path, networkInfo);
}

function writeFile(txHash) {
    const path = './result/1_result.txt';
    jetpack.write(path, txHash);
}

main()
