import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';

const ifsClient = require('ipfs-http-client')
//const ipfs = ifsClient('ipfs.infura.io', 5001, {protocol: 'https'})
const ipfs = ifsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'http' })

class App extends Component {
  constructor(props){
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
      this.setState({ buffer: Buffer(reader.result)})
    }
    console.log('file captured..');
  }

  onSubmit = async (event) => {
    try {
      event.preventDefault()
      console.log('Submitting the form', this.state.buffer);
      
      ipfs.add(this.state.buffer)
				.then(function (result) {			
          console.log('IPFS', result)
				})
				.catch(function(err) {
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
