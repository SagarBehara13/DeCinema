import React, { useState, useEffect } from "react"

import "./Nav.css"


function Nav(props) {
  return (
    <div className="nav__contents">
      <img
        className="nav__logo"
        src={require("../images/logo.png")}
        alt="Netflix logo"
      />
      <a href='/request/contribute' className="nav__button">Contribute</a>
      <a href='/request/add' className="nav__button">Request funds</a>
      <a href='/request/end' className="nav__button">End and repay</a>
      <a href='/' className="nav__button">View requests for funds</a>
      <a href='/' className="nav__button">Swap Tokens</a>
    </div>
  )
}


export default Nav
