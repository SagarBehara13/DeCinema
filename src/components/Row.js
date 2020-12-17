import React, { Component } from "react"
import ScrollContainer from "react-indiana-drag-scroll"

import "./Row.css"


class Row extends Component {
  render() {
    return (
      <div className="row">
        <h2>{this.props.title}</h2>
        <br />
        <br />
        <br />
        <ScrollContainer className="row__posters">
          {this.props.data.map((filmDetail, index) => (
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
