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
          className="nav__logo"
          src={require("../images/logo.png")}
          alt="Netflix logo"
        />
      </div>
    </nav>
  )
}


export default Nav
