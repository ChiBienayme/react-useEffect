import { useEffect, useState } from 'react'

function Resize() {
    //3-2 - Resize
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        //Cleanup func
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

    return (
        <div>
            <h1>
                {width}
            </h1>
        </div>
    )
}

export default Resize