import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';

const ifsClient = require('ipfs-http-client')

//const ipfs = ifsClient('ipfs.infura.io', 5001, {protocol: 'https'})
const ipfs = ifsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'http' })
const Web3 = require("web3");

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buffer: null
    }
  }


  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }
    console.log('file captured..');
  }

  onSubmit = async (event) => {
    try {
      event.preventDefault()
      console.log('Submitting the form', this.state.buffer);

      const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
      const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
      const addr = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";
      const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
      priceFeed.methods.latestRoundData().call()
        .then((roundData) => {
          // Do something with roundData
          console.log("Latest Round Data", roundData)
        });

      ipfs.add(this.state.buffer)
        .then(function (result) {
          console.log('IPFS', result)
        })
        .catch(function (err) {
          console.log('Fail: ', err)
        })

    } catch (e) {
      console.log(e)
    }

  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <form onSubmit={this.onSubmit}>
                  <input type="file" onChange={this.captureFile}></input>
                  <input type="submit"></input>
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
