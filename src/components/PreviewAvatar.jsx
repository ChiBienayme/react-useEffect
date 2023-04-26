import { useState, useEffect } from 'react'

function PreviewAvatar() {
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        //Cleanup
        return(() => {
            //delete photo in memory 
            avatar && URL.revokeObjectURL(avatar.preview)
        })
    }, [avatar])

    const handlePrevReviewAvatar = (e) => {
        const file = e.target.files[0]

        //preview avatar 
        file.preview = URL.createObjectURL(file)

        setAvatar(file)

        //avoid uploading 2 same photos (clean value of input)
        e.target.value = null
    }

    return (
        <div>
            <input 
                type="file" 
                // multiple = many photos
                onChange={handlePrevReviewAvatar}
            />

            {avatar && (
                <img src={avatar.preview} alt="" width="80%" />
            )}
        </div>
    )
}
export default PreviewAvatar