import React, { useState } from 'react'

const Run = () => {
    const [count, setCount] = useState(0);
    console.log(count)
    // let x = 10

       
    const handleIncrement = ()=>{

        setCount((prev)=>prev+1) //1
        setCount((prev)=>prev+2) //3
        setCount((prev)=>prev+3) //6
        // setCount(count+1) //1
        // setCount(count+2) //2
        // setCount(count+3) //3
        // console.log(count)
    }
  return (
    <div>
        <h1>{count}</h1>
      <button onClick={handleIncrement}>increment</button>
    </div>
  )
}

export default Run
