import { useState, useEffect } from 'react'

function CleanUp() {
    const [count, setCount] = useState(1)

    useEffect(() => {
        console.log(`Mounted or Re-render ${count}`)

        //cleanup func
        return () => {
            console.log(`Cleanup ${count}`)
        }
    }, [count])

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Click me!</button>
        </div>
    )
}
export default CleanUp