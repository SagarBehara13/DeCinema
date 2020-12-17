import Web3 from 'web3'
import { Spinner, Table } from 'reactstrap'
import React, { Component } from "react"
import { withRouter, Redirect } from 'react-router-dom'

import "./App.css"
import "./details.css"
import Row from "./Row"
import Token from "../abis/Token.json"


class Details extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   film: null,
    //   loading: true,
    //   account: '',
    //   filmDetails: []
    // }
  }

  render() {
    const data = this.props.location && this.props.location.state && this.props.location.state.film || null;
    if (data === null) {
        return <Redirect
            to={{
                pathname: "/home",
                state: {}
            }}
        />
    }
    console.log('test details', data);
    return (
    <Table className="Table" dark>
        <h2>Film Details</h2>
        <br />
        <br />
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>FilmId</td>
            <td>{Number(data.id._hex)}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>FilmName</td>
            <td>{data.filmName}</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Budget</td>
            <td>{Number(data.budget._hex)} DCN</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Director's Name</td>
            <td>{data.directorName}</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Budget</td>
            <td>{Number(data.budget._hex)}</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>InterstRate</td>
            <td>{Number(data.rate._hex)} %</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>Paid Back?</td>
            <td>{data.payedBack? "Yes": "No"}</td>
          </tr>
          <tr>
            <th scope="row">8</th>
            <td>Director's Wallet Address</td>
            <td>{data.directorWalletAddress}</td>
          </tr>
          <tr>
            <th scope="row">9</th>
            <td>Fund Raised</td>
            <td>{Number(data.fundRaised._hex)} DCN</td>
          </tr>
          <tr>
            <th scope="row">10</th>
            <td>Status</td>
            <td>{data.status}</td>
          </tr>
          <tr>
            <th scope="row">11</th>
            <td>Category</td>
            <td>{data.category}</td>
          </tr>
          <tr>
            <th scope="row">12</th>
            <td>Script</td>
            <td><a href={`https://ipfs.infura.io/ipfs/${data.script}`} target="_blank" download="file">View Script</a></td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export default withRouter(Details);
