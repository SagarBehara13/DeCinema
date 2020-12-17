import Web3 from 'web3'
import { Spinner } from 'reactstrap'
import React, { Component } from "react"
import { withRouter } from 'react-router-dom'

import "./App.css"
import Row from "./Row"
import Token from "../abis/Token.json"


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filmCount: 0,
      film: null,
      loading: true,
      account: '',
      filmDetails: []
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Token.networks[networkId]

    if (networkData) {
      const film = new web3.eth.Contract(Token.abi, networkData.address)
      this.setState({ film })

      const filmCount = await film.methods.filmsCount().call()

      this.setState({ filmCount })

      for (var i = 1; i <= filmCount; i++) {
        const filmData = await film.methods.films(i).call()
        const filmDetail = await film.methods.filmsDetails(i).call()

        this.setState({ filmDetails: [...this.state.filmDetails, { ...filmData, ...filmDetail }] })
      }

      this.setState({ loading: false })

    } else {
      window.alert("Auction contract is not deployed to detected network")
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <center style={{ padding: '100px' }}>
          <Spinner animation="border" size="lg" role="status">
          </Spinner>
        </center>
      )
    }

    const chunk = 1;
    const chunkArrays = [];

    for (let i = 0; i < this.state.filmDetails.length; i += chunk) {
      chunkArrays.push(
        this.state.filmDetails.slice(i, i + chunk)
      )
    }

    console.log('Length', this.state.filmDetails.length)

    return (
      <>
        {
          chunkArrays.map(chunkArray => <Row title="Trending now" data={this.state.filmDetails} />)
        }
      </>

    )
  }
}

export default withRouter(App);
