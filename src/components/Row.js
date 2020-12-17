import Web3 from 'web3'
import React, { Component } from "react"
import ScrollContainer from "react-indiana-drag-scroll"
import { Spinner } from 'reactstrap'

import "./Row.css"
import Token from '../abis/Token.json'


class Row extends Component {

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

    return (
      <div className="row">
        <h2>{this.props.title}</h2>
        <br />
        <ScrollContainer className="row__posters">
          {this.state.filmDetails.map((filmDetail, index) => (
            < img
              // onClick={() =>
              //   movieClicked(movie.name || movie.title || movie.orginal_name)
              // }
              key={index}
              className={`row__poster ${this.props.isLargeRow && "row__posterLarge"}`}
              src={`https://ipfs.infura.io/ipfs/${filmDetail.poster}`}
              alt={'Request'}
            />
          ))}
        </ScrollContainer>
      </div>
    )
  }
}


export default Row
