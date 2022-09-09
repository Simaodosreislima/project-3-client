import React from 'react'
import { Link } from "react-router-dom"
import "./signup.css"
function HomePage() {


  return (
    <div className="homepage flex flex-col justify-start items-center">
      <p className="uppercase mt-32 md:mt-26 text-3xl font-bold text-white">Come together</p>
      <span className="text-white my-16 mx-28 text-center font-bold text-1xl">Unleash your McCartney to find your Lennon</span>
      <Link to="/signup">
        <button className="text-white mt-26 md:my-14 bg-pink-600 px-2 py-1 text-2xl border-solid border-2 border-white rounded-md">Sign Up</button>
      </Link>
    </div>
  )
}

export default HomePage