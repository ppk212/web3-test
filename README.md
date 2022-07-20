
# Requirements

- node `v14.19.3`
- npm `v6.14.17`
- ganache-cli `v6.12.2`



# INSTALL

```
npm install
```




# USAGE

## Execute ganache-cli
```
ganache-cli --account="0x5eadbceddd2445e35d3f9bbe5dcbec3c414c7d95d1822f017c11e5fe35eefe37,10000000000000000000000000" --account="0x56f1e266fa8d80b1ba2cef87ba284dee97a7819f9cae47d4d4a2c9e9b3782828,0"
```

## Execute test code for sign

### Sign tx for tranfering eth
```
node 1_CreateTxOnline.js
node 2_SignTxOffline.js
node 3_SendTxOnline.js
```



# Scenarios

### 1. Create Tx Online - 1_CreateTxOnline.js
1. Add account for Tx
2. Connect web3 network
3. Create tx which transfer eth
4. Write hash of tx in .txt file - File Path : './result/1_result.txt'
5. Write network info in network json (Option) - File Path : './result/networkInfo.json'

### 2. Sign Tx Offline - 2_SignTxOffline.js
1. Add account for Tx
2. Get tx hash(rlp) in file - File Path : './result/1_result.txt'
3. Get network info in file (Option) - File Path : './result/networkInfo.json'
4. Sign tx which transfer eth
5. Write tx hash in file - File Path : './result/2_serialized_tx.txt'

### 3. Send Tx Online - 3_SendTxOnline.js
1. Add account for Tx
2. Connect web3 network
3. Get tx's hash signed in file - File Path : './result/2_serialized_tx.txt'
4. Send signed tx which transfer eth
5. Get receipt of tx deployed
6. Write tx receipt finalized in file - File Path : './result/3_send_tx.txt'
