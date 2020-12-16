import React, { useEffect, useState } from "react"

import "./Banner.css"
import axios from "./axios"
import requests from "./requests"


const base_url = "https://image.tmdb.org/t/p/original/"


function Banner() {
  const [movie, setMovie] = useState({})

  useEffect(() => {
    async function fetchMovie() {
      const request = await axios.get(requests.fetchNetflixOriginals)
      setMovie(
        request.data.results[
        Math.floor(Math.random() * request.data.results.length)
        ]
      )
    }
    fetchMovie()
  }, [])

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie ? `url('${base_url}${movie.backdrop_path}')` : null, //optional chaining: no need to check if movie is undefined '?' saw this neat trick on stackoverflow
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.name || movie.title || null}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">More Info</button>
        </div>
        <p className="banner__description">{movie ? movie.overview : null}</p>
      </div>
    </header>
  )
}


export default Banner
