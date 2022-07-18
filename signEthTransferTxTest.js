import Web3 from "web3";
import blockchain from "./blockchain.js";

function main() {
    const web3 = new Web3();
    console.log("Web3 Instance Create Complete");

    // 1. Add account for Tx
    blockchain.addAccount(web3);
    // 2. Connect web3 network
    blockchain.connectGanache(web3);

    // 3. Get nonce for tx on-line
    blockchain.getNonce(web3, web3.eth.accounts.wallet[0]).then(txCount => {
        console.log("Nonce : ", txCount);

        // 4. Disconnect web3 network
        blockchain.disConnectGanache(web3);

        // 5. Create tx which transfer eth
        blockchain.createTxForTransferEth(web3, txCount).then(txObject => {
            // 6. Sign tx
            blockchain.signTx(web3, txObject).then(raw => {
                // 7. Connect web3 network
                blockchain.connectGanache(web3);
                // 8. Send tx signed
                blockchain.sendSignedTx(web3, raw).then(txResult => {
                    const txHash = txResult.transactionHash;
                    // 9. Get receipt for tx
                    blockchain.getTransactionReceipt(web3, txHash).then(receipt => {
                        console.log(receipt);
    
                        // 10. Get balance for sender and receiver
                        blockchain.getBalance(web3, web3.eth.accounts.wallet[0]).then(balance => {
                            console.log("Account[0].address : ", web3.eth.accounts.wallet[0].address);
                            console.log("Account[0] : ", balance);
                        });
                        blockchain.getBalance(web3, web3.eth.accounts.wallet[1]).then(balance => {
                            console.log("Account[1].address : ", web3.eth.accounts.wallet[1].address);
                            console.log("Account[1] : ", balance);
                        });
                    });
                });
            });
        });
    }).catch(err => {
        console.log("Nonce can be created only On-line!");
    });   
}

main()
