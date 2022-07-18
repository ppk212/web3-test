import { Transaction } from "ethereumjs-tx";
import Common from "ethereumjs-common";
import Web3 from "web3";

const blockchain = {
    addAccount: function(web3) {
        web3.eth.accounts.wallet.add("0x5eadbceddd2445e35d3f9bbe5dcbec3c414c7d95d1822f017c11e5fe35eefe37");
        web3.eth.accounts.wallet.add("0x56f1e266fa8d80b1ba2cef87ba284dee97a7819f9cae47d4d4a2c9e9b3782828");
    },
    getNonce: async function(web3, account) {
        return await web3.eth.getTransactionCount(account.address);
    },
    signTx: async function(web3, txCount) {
        const receiver = web3.eth.accounts.wallet[1];
    
        // Create tx for sending 1 ETH to account[1]
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            gasLimit: web3.utils.toHex(1000000),
            to: receiver.address,
            value: web3.utils.toHex(web3.utils.toWei('1', "ether"))
        };
        
        return txObject;
    },
    connectGanache: function(web3) {
        web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    },
    disConnectGanache: function(web3) {
        web3 = new Web3();
    },
    getBalance: async function(web3, account) {
        return web3.eth.getBalance(account.address);
    },
    sendSignedTx: async function(web3, txObject) {
        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.getChainId();
        
        const privateKey = Buffer.from(
            web3.eth.accounts.wallet[0].privateKey.substring(2),
            'hex'
        );
    
        const customCommon = Common.default.forCustomChain(
            'mainnet',
            {
                name: 'my-private-blockchain',
                networkId: networkId,
                chainId: chainId,
            },
            'istanbul',
        );
    
        const tx = new Transaction(txObject, {common:customCommon});
    
        tx.sign(privateKey);
    
        const serializedTx = tx.serialize();
    
        const raw = '0x' + serializedTx.toString("hex");
    
        const txResult = await web3.eth.sendSignedTransaction(raw);
    
        return txResult;
    },
    getTransactionReceipt: async function(web3, txHash) {
        return await web3.eth.getTransactionReceipt(txHash);
    }
}

export default blockchain;