import React from "react"

import "./App.css"
import Row from "./Row"
import requests from "./requests"


function App() {
  return (
    <>
      <Row title="Trending now" fetchUrl={requests.fetchTrending} />
      <Row title="Trending now" fetchUrl={requests.fetchTrending} />
      <Row title="Trending now" fetchUrl={requests.fetchTrending} />
    </>
  )
}

export default App;
