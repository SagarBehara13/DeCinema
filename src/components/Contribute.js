import Web3 from 'web3'
import React, { Component } from "react"
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback, Spinner } from 'reactstrap'

import "./Nav.css"
import "./AddRequest.css"
import Token from '../abis/Token.json'


class Contribute extends Component {
  constructor(props) {
    super(props)

    this.state = {
      account: '',
      film: '',
      loading: false,
      loadingMessage: '',
      filmId: '',
      amount: '',
      touched: {
        filmId: false,
        amount: false,
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validate = this.validate.bind(this);

    this.loadWeb3 = this.loadWeb3.bind(this)
    this.loadBlockchainData = this.loadBlockchainData.bind(this)
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

      this.setState({ loading: false })

    } else {
      window.alert("Token contract is not deployed to detected network")
    }
  }

  handleInputChange(event) {
    const target = event.target
    const name = target.name
    let value = target.value

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = this.validate(this.state.filmId, this.state.amount)

    if (errors.filmId !== '' && errors.amount !== '') {
      return
    }

    this.setState({ loading: true, loadingMessage: 'Saving scripts and poster to IPFS' })

    this.state.film.methods.contribute(this.state.filmId, this.state.amount)
      .send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false, loadingMessage: '' })

        this.props.history.push('/home')
      })

    this.setState({ loading: false, loadingMessage: '' })
  }

  validate(filmId, amount) {
    const errors = {
      filmId: '',
      amount: '',
    }

    if (this.state.touched.filmId && (filmId === null || filmId === undefined || filmId === '' || !filmId))
      errors.filmId = 'FilmId should be greater than 0'

    if (this.state.touched.amount && (amount === null || amount === undefined || amount === '' || !amount))
      errors.amount = 'Amount should be greater than 0'

    return errors
  }

  handleBlur = (field) => (event) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [field]: true
      }
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <center style={{ padding: '100px' }}>
          <Spinner animation="border" size="lg" role="status">
            <span className="sr-only">
              Loading! {this.state.loadingMessage}
            </span>
          </Spinner>
        </center>
      )
    }

    const errors = this.validate(this.state.filmId, this.state.amount)

    return (
      <div className="container-fluid">
        <div className="row">
          <Form onSubmit={this.handleSubmit} className="addform-container col-12 col-md-9">
            <h2>Contribute to a request</h2>
            <FormGroup row>
              <Label htmlFor="filmId" md={2}>Film id</Label>
              <Col md={10}>
                <Input className='input' type="number" id="filmId" name="filmId"
                  placeholder="Film id"
                  value={this.state.filmId}
                  valid={errors.filmId === ''}
                  invalid={errors.filmId !== ''}
                  onBlur={this.handleBlur('filmId')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.filmId}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="amount" md={2}>Amount</Label>
              <Col md={10}>
                <Input className='input' type="number" id="amount" name="amount"
                  placeholder="Amount to contribute"
                  value={this.state.amount}
                  valid={errors.amount === ''}
                  invalid={errors.amount !== ''}
                  onBlur={this.handleBlur('amount')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.amount}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="danger">
                  Contribute to request
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}


export default withRouter(Contribute)
