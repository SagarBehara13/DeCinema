import Web3 from 'web3'
import React, { Component } from "react"
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback, Spinner } from 'reactstrap'

import "./Nav.css"
import "./AddRequest.css"
import Token from '../abis/Token.json'

const ifsClient = require('ipfs-http-client')


const ipfs = ifsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })


class AddRequest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      account: '',
      film: '',
      loading: true,
      loadingMessage: '',
      filmname: '',
      directorname: '',
      budget: '',
      interestrate: '',
      description: '',
      category: '',
      poster: null,
      script: null,
      posterBuffer: null,
      scriptBuffer: null,
      posterHash: null,
      scriptHash: null,
      touched: {
        filmname: false,
        directorname: false,
        interestrate: false,
        description: false,
        category: false,
        budget: false,
        poster: false,
        script: false,
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
      window.alert("FilmFactory contract is not deployed to detected network")
    }
  }

  handleInputChange(event) {
    const target = event.target
    const name = target.name
    let value = null

    if (target.type === 'file') {
      value = target.files[0];

      const reader = new window.FileReader();
      reader.readAsArrayBuffer(value);

      reader.onloadend = () => {
        this.setState({ [`${name}Buffer`]: Buffer(reader.result), [name]: true })
      }

    } else {
      value = target.value

      this.setState({
        [name]: value
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const errors = this.validate(this.state.filmname, this.state.directorname, this.state.interestrate, this.state.budget, this.state.category, this.state.poster, this.state.script, this.state.description)

    if (errors.filmname !== '' && errors.directorname !== '' && errors.interestrate !== '' && errors.description !== ''
      && errors.category !== '' && errors.budget !== '' && !this.state.posterBuffer && !this.state.scriptBuffer) {
      return
    }

    this.setState({ loading: true, loadingMessage: 'Saving scripts and poster to IPFS' })

    const posterIpfs = await ipfs.add(this.state.posterBuffer)
    const scriptIpfs = await ipfs.add(this.state.scriptBuffer)

    this.state.film.methods.createFilm(
      this.state.filmname.trim(),
      Number(this.state.budget),
      this.state.directorname.trim(),
      posterIpfs,
      scriptIpfs,
      this.state.description,
      Number(this.state.interestrate),
      this.state.category
    ).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false, loadingMessage: '' })

        this.props.history.push('/home')
      })
  }

  validate(filmname, directorname, interestrate, budget, category, poster, script, description) {
    const errors = {
      filmname: '',
      directorname: '',
      interestrate: '',
      description: '',
      category: '',
      budget: '',
    }

    if (this.state.touched.filmname && filmname.length < 3)
      errors.filmname = 'Filmname name should be >= 3 characters'
    else if (this.state.touched.filmname && filmname.length > 20)
      errors.firstname = 'Filmname name should be <= 10 characters'

    if (this.state.touched.directorname && directorname.length < 3)
      errors.directorname = 'Director name should be >= 3 characters'
    else if (this.state.touched.directorname && directorname.length > 10)
      errors.lastname = 'Director name should be <= 10 characters'

    if (this.state.touched.interestrate && (interestrate === null || interestrate === undefined))
      errors.interestrate = 'Rate should be entered even if 0'

    if (this.state.touched.budget && (budget === null || budget === undefined))
      errors.budget = 'Budget should be greater than 0'

    if (this.state.touched.category && category.length === 0)
      errors.category = 'Category should not be empty'

    if (this.state.touched.description && description.length === 0)
      errors.description = 'Description should not be empty'

    if (this.state.touched.script && !script)
      errors.script = 'Script file has to be uploaded'

    if (this.state.touched.poster && !poster)
      errors.poster = 'Poster file has to be uploaded'

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
    const errors = this.validate(this.state.filmname, this.state.directorname, this.state.interestrate, this.state.budget, this.state.category, this.state.poster, this.state.script, this.state.description)

    return (
      <div className="container-fluid">
        <div className="row">
          <Form onSubmit={this.handleSubmit} className="addform-container col-12 col-md-9">
            <h2>Request funds</h2>
            <FormGroup row>
              <Label htmlFor="filmname" md={2}>Filmname</Label>
              <Col md={10}>
                <Input className='input' type="text" id="filmname" name="filmname"
                  placeholder="Filmname"
                  value={this.state.filmname}
                  valid={errors.filmname === ''}
                  invalid={errors.filmname !== ''}
                  onBlur={this.handleBlur('filmname')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.filmname}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="budget" md={2}>Film budget</Label>
              <Col md={10}>
                <Input className='input' type="number" id="budget" name="budget"
                  placeholder="Film budget"
                  value={this.state.budget}
                  valid={errors.budget === ''}
                  invalid={errors.budget !== ''}
                  onBlur={this.handleBlur('budget')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.budget}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="directorname" md={2}>Director name</Label>
              <Col md={10}>
                <Input className='input' type="text" id="directorname" name="directorname"
                  placeholder="Director name"
                  value={this.state.directorname}
                  valid={errors.directorname === ''}
                  invalid={errors.directorname !== ''}
                  onBlur={this.handleBlur('directorname')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.directorname}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="poster" md={2}>Poster file</Label>
              <Col md={10}>
                <Input
                  type="file" id="poster" name="poster"
                  placeholder="Upload poster"
                  valid={errors.poster === ''}
                  invalid={errors.poster !== ''}
                  onBlur={this.handleBlur('poster')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.poster}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="script" md={2}>Script file</Label>
              <Col md={10}>
                <Input type="file" id="script" name="script"
                  placeholder="Upload script"
                  valid={errors.script === ''}
                  invalid={errors.poster !== ''}
                  onBlur={this.handleBlur('script')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.script}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="description" md={2}>Short description</Label>
              <Col md={10}>
                <Input className='input' type="textarea" id="description" name="description"
                  rows="6"
                  value={this.state.description}
                  valid={errors.description === ''}
                  invalid={errors.description !== ''}
                  onBlur={this.handleBlur('description')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.description}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="interestrate" md={2}>Fixed interest percent</Label>
              <Col md={10}>
                <Input className='input' type="number" id="interestrate" name="interestrate"
                  placeholder="Fixed interest percent"
                  value={this.state.interestrate}
                  valid={errors.interestrate === ''}
                  invalid={errors.interestrate !== ''}
                  onBlur={this.handleBlur('interestrate')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.interestrate}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor="directorname" md={2}>Category</Label>
              <Col md={10}>
                <Input className='input' type="text" id="category" name="category"
                  placeholder="Film category"
                  value={this.state.category}
                  valid={errors.category === ''}
                  invalid={errors.category !== ''}
                  onBlur={this.handleBlur('category')}
                  onChange={this.handleInputChange} />
                <FormFeedback>{errors.category}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="danger">
                  Create request
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}


export default withRouter(AddRequest)
