import React from 'react'
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=&response_type=code&redirect_uri=http://localhost:3000&scope=user-top-read"

function SpotifyAuth() {
  return (
    <div>
      return
      <a href={AUTH_URL}>Login with spotify</a>
    </div>
  )
}

export default SpotifyAuth