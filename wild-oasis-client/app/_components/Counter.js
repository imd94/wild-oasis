"use client"

import React, { useEffect, useState } from "react"

function Counter({ users }) {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <h2>There are { users.length } users on the page.</h2>
      <button onClick={ () => setCount((c) => c + 1) }>{ count }</button>
    </div>
  )
}

export default Counter