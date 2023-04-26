import { useState, useLayoutEffect } from 'react'

function UseLayoutEffect() {
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    if (count >  3) {
        setCount(0)
    }
  }, [count])

  const handleRun = () => {
    setCount(count + 1)
  }

  return (
    <>
      <button onClick={handleRun}>
        Count
      </button>

      <h1>
        count is {count}
      </h1>
    </>
  )
}

export default UseLayoutEffect