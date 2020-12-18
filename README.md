<h1 align="center">Equip-DeCinema</h1>
<h2 align="center">Decentralized Film production</h2>
DeCinema stands for decentralized cinema, It’s an blockchain baised dapp that aids directors/filmmakers to raise funds for their movie and allows each and every individual to be a producer. 

### Basic Work Flow
* Director/Filmmaker requests for funds for production in DCN token(Decinema token).
* Decinema has a small dex like feature that swaps BNB to DCN and vice-versa.
* The script,poster data is stored in interplanetary file system (IPFS).
* Director/filmaker raises funds with fixed amount of interest to be paid back to the contributors.
* Each and every contributors is termed as producer(share holder to the film).
* After the total box earnings from the film, The filmmaker does returns the fund with fixed interest of amount set.
* The repaid funds are then distributed amongst each shareHolder(contributors) with amount of interest earned on the basis of his/her amount
 of share.

### Steps to test
```
1) Connect Metamask
  
   Name: Binance Smart Chain Testnet
   RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545
   ChainID: 0x61
   Symbol: BNB
   Block Explorer: https://explorer.binance.org/smart-testnet

2) Create .env file add metamask's PRIVATE_KEY
3) git clone https://github.com/SagarBehara13/DeCinema.git
4) yarn
5) yarn start
  
```

### Videos
```
project intro :- https://youtu.be/NpWEogO8D08
These video does explains the basic flow working of the project.

working prototype video :- https://youtu.be/5rf1E4sW-cM
These video does showcase the overall working of the project step by step.
```

### Daap's Glimpse
<h2 align="center"> Example Interface </h2>
<img src="https://github.com/SagarBehara13/DeCinema/blob/master/src/images/Screen%20Shot%202020-12-18%20at%203.03.50%20AM.png"><br></br>

<h2 align="center"> Film's fund raising form </h2>
<img src="https://github.com/SagarBehara13/DeCinema/blob/master/src/images/Screen%20Shot%202020-12-18%20at%203.04.05%20AM.png"><br></br>

<h2 align="center"> Swap BNB to DCN </h2>
<img src="https://github.com/SagarBehara13/DeCinema/blob/master/src/images/Screen%20Shot%202020-12-18%20at%203.04.48%20AM.png"><br></br>

<h2 align="center"> Retriving the data stored on blockchain and ipfs </h2>
<img src="https://github.com/SagarBehara13/DeCinema/blob/master/src/images/Screen%20Shot%202020-12-18%20at%203.05.29%20AM.png"><br></br>

### BSC Contract Address
```
Token:- 0x918da5e5822490055D208CAf249f593AF6D18148
BnbSwap:- 0x40A1f6eE4EA34A99916bd7036Cd28a32D7B60b0C

* All the contracts are deployed on bsc testnet
```
### Resources Utilized
```
* Metamask
* Truffle
* Binance Smart Chain
* Web3
* IPFS
```
### Remarks
```
We have used boilerplate from dapp university and modified as per our need.
We have used themoviedb.org free api for dummy content.
We had this crazy idea hit our mind a bit late so we did modified the name and flow.
```
### Todo
```
Implement chainlink and create an external adapter to feed or dapp with content.
Deploy the dapp on bsc mainnet
Proof of contribution via nft sort of certificate to contributors.
Badges and user level as per contribution.
```
