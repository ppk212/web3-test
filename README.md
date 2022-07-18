
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
node signEthTransferTxTest.js
```



# Scenarios

### 1. signEthTransferTxTest.js - Sign tx for tranffering eth
1. Add account for Tx
2. Web3 network connect
3. Get nonce for tx on-line
4. Web3 network disconnection
5. Tx which transfer eth create and sign
6. Web3 network connect
7. Send signed tx
8. Get receipt for tx
9. Get balance for sender and receiver

