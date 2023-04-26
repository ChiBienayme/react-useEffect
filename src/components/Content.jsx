import { useEffect, useState } from 'react'

const tabs = ['posts', 'comments', 'albums', 'photos', 'todos', 'users']

function Content() {
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const [type, setType] = useState('posts')
    const [showGoToTop, setShowGoToTop] = useState(false)


    // console.log(type)

    //useEffect(callback, [deps])

    // 1 - //useEffect(callback) - Update DOM
    useEffect(() => {
        console.log('Re-render', title)
        document.title = title
    })

    //2.1 - //useEffect(callback, [ ]) - call API
    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/posts')
    //         .then(res => res.json())
    //         .then(posts => {
    //             setPosts(posts)
    //         })
    // }, [])

    //2.2 - //useEffect(callback, [ deps ]) - call API
     useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(posts => {
                setPosts(posts)
            })
    }, [type])

    // 3 - Listen DOM events
    //3.1 - scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setShowGoToTop(true)
            } else {
                setShowGoToTop(false)
            }
        }
        //Viet tat: showGoToTop(window.scrollY >=200)

        window.addEventListener('scroll', handleScroll)
        console.log('addEventListener')

        //Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll)
            console.log('removeEventListener')
        }
    }, [])

    return (
        <div>
            {tabs.map(tab => (
                <button 
                    key={tab}
                    style={type === tab ? {
                        color: '#fff',
                        backgroundColor: '#333'
                    } : {}}
                    onClick={() => setType(tab)}
                >
                    {tab}
                </button>
            ))}

            <input 
                value={title}
                onChange={e => setTitle(e.target.value)} 
            />

            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title || post.name}</li>
                ))}
            </ul>

            {showGoToTop && (
                <button
                    style={{
                        position: 'fixed',
                        right: 20,
                        bottom: 20
                    }}
                >
                    Go To Top
                </button>
            )}
        </div>
    )
}

export default Content