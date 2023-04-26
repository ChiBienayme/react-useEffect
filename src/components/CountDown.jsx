import { useState, useEffect } from 'react'

function CountDown() {
    const [countDown, setCountDown] = useState(180)

    // Cach 1: setInterval()
    useEffect(() => {
        const timerId = setInterval(() => {
            setCountDown(prevState => prevState -1)
        }, 1000)

        //clear func
        return () => clearInterval(timerId)
    }, [])
    
    // Cach 2: setTimeout()
    // const timerId = useEffect(() =>{
    //     setTimeout(() => {
    //         setCountDown(countDown - 1)
    //     }, 1000)

    //     //clear func
    //     return () => clearTimeout(timerId)
    // }, [countDown])

    return(
        <div>
            <h1>{countDown}</h1>
        </div>
    )
}

export default CountDown