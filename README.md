## DISHA : Decentralized and Integrated Shipping ports Administration

DISHA is a fully working blockchain platform prototype built for MOVEHACK 2018 competition. For more information about platform, please go to Documents directory in this folder.


-------------------------------------------------------
## Package requirements :

1. npm : https://www.npmjs.com/get-npm
2. Truffle Framework : https://truffleframework.com/
3. Ganache : https://truffleframework.com/ganache
4. Metamask chrome extension : https://metamask.io/
5. json-server : https://github.com/typicode/json-server
6. web3.js : https://github.com/ethereum/web3.js/
-------------------------------------------------------

-------------------------------------------------------
## Run :

1. Install all packages
2. Run Ganache
3. login to Metamask and add custom RPC with same host as Ganache (Most probably : http://localhost:7545)
4. Import Ganache Ethereum accounts into Metamask by using private key
5. Go to truffle.js and change the address 'from : ***********' to one of the accounts in Ganache. That will be the Authority of the project.
6. Go to current directory in terminal and type :
7. $ truffle migrate --reset
8. $ npm run dev

## For realtime data tracking:
1. $ npm install -g json-server
2. $ cd data
3. $ json-server --watch db.json

-------------------------------------------------------

------- Developed by : Team CodeXpert -------

      Krishna Kulkarni
      Ganesh Deshpande

----------------------------

Contact : krishnakulkarni9393@gmail.com