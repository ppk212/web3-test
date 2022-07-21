import jetpack from "fs-jetpack";
import Web3 from "web3";
import blockchain from "../../blockchain.js";
import Log from "console-log-level";
import Storage from "./contracts/Storage.json"

const log = Log({
    prefix: function(level) {
        return `[${level}]`
    },
    level: 'trace'
});


function main() {
    const web3 = new Web3();

    // 1. Add account for Tx
    blockchain.addAccount(web3);
    // 2. Connect web3 network
    blockchain.connectGanache(web3);

    // 3. Create tx which deploy contract
    blockchain.createTxForDeployContract(web3, Storage.bytecode).then(txHash => {
        log.trace('Final - txHash : ', txHash);
        // 4. Write hash of tx in .txt file
        writeFile(txHash);
        log.trace('Write File - txHash : ', txHash);
        
        // 5. Write network info in network json (Option)
        blockchain.getNetworkInfo(web3).then(networkInfo => {
            writeNetworkJson(networkInfo);
        });
    });
}

function writeNetworkJson(networkInfo) {
    const path = './scripts/deployContract/result/networkInfo.json';
    jetpack.write(path, networkInfo);
}

function writeFile(txHash) {
    const path = './scripts/deployContract/result/1_result.txt';
    jetpack.write(path, txHash);
}

main()
