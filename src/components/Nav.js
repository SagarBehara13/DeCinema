import React, { useState, useEffect } from "react"

import "./Nav.css"


function Nav() {
  const [navbarBlack, setNavbarBlack] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setNavbarBlack(true)
    })
    return () => {
      window.removeEventListener("scroll")
    }
  }, [])

  return (
    <nav className={`${navbarBlack && "nav__black"}`}>
      <div className="nav__contents">
        <img
          href='/'
          className="nav__logo"
          src={require("../images/logo.png")}
          alt="Netflix logo"
        />
        <a href='/request/contribute' className="banner__button">Contribute</a>
        <a href='/request/add' className="banner__button">Request funds</a>
        <a href='/request/end' className="banner__button">End and repay</a>
        <a href='/' className="banner__button">View requests for funds</a>
        <a href='/' className="banner__button">Swap Tokens</a>
      </div>
    </nav>
  )
}


export default Nav
