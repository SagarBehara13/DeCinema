import React from "react"

import "./App.css"
import Row from "./Row"
import Banner from "./Banner"
import requests from "./requests"


function App() {
  return (
    <>
      <Banner />
      <Row
        isLargeRow
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title="Trending now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTrending} />
    </>
  )
}


export default App
