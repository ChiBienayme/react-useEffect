#  useEffect


## App.jsx
```javascript
    import { useState } from  'react'
    import Content from './Content'

    function App() {
    const [show, setShow] = useState(false)
    return (
        <div style={{ paddingLeft: 50 }}>
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show && <Content/>}
        </div>
    )
    }

    export default App

```

# A - Update DOM
## 1 - useEffect(callback) - update DOM
```javascript
    import { useEffect, useState } from 'react'

    function Content() {
        const [title, setTitle] = useState('')
        //useEffect(callback, [deps])

        useEffect(() => {
            console.log('Re-render', title)
            document.title = title
        })

        return (
            <div>
                <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)} 
                />
            </div>

        )
    }

    export default Content
```


# B - Call API
## 2 - useEffect(callback,  [ ]) - call API
```javascript
import { useEffect, useState } from 'react'

function Content() {
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])

    //2 - //useEffect(callback, [ ]) - call API
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(posts => {
                setPosts(posts)
            })
    }, [])


    return (
        <div>
            <input 
                value={title}
                onChange={e => setTitle(e.target.value)} 
            />

            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>

    )
}

export default Content
```

## 3 - useEffect(callback, [ deps ]) - call API
```javascript
import { useEffect, useState } from 'react'

const tabs = ['posts', 'comments', 'albums', 'photos', 'todos', 'users']

function Content() {
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const [type, setType] = useState('posts')

    console.log(type)

    //3 - //useEffect(callback, [ deps ])
     useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(posts => {
                setPosts(posts)
            })
    }, [type])


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
        </div>

    )
}

export default Content
```

# C - Listen DOM events
## C.1 - Scroll + Cleanup function 
```javascript
import { useEffect, useState } from 'react'

const tabs = ['posts', 'comments', 'albums', 'photos', 'todos', 'users']

function Content() {
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const [type, setType] = useState('posts')
    const [showGoToTop, setShowGoToTop] = useState(false)

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
```

## C.2 - Resize
```javascript
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
```

# D - useEffect with timer functions
```javascript
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
```

#  E - Preview Avatar
```javascript
import { useState, useEffect } from 'react'

function Avatar() {
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
export default Avatar
```

# F - Chat App
### main.jsx
```javascript
//Fake Comments
function emitComment(id) {

  setInterval(() => {
    window.dispatchEvent(
      new CustomEvent(`lesson-${id}`, {
        detail: `Content comments of lesson ${id}`
      })
    )
  }, 2000)

}
emitComment(1)
emitComment(2)
emitComment(3)
```

### ChatApp.jsx
```javascript
import { useState, useEffect } from 'react'

const lessons = [
    {
        id: 1,
        name: 'HTML, CSS'
    },
    {
        id: 2,
        name: 'Javascript'
    },
    {
        id: 3,
        name: 'ReactJS'
    }
]

function ChatApp() {
    const [lessonId, setLessonId] = useState(1)

    useEffect(() => {

        const handleComment = ({ detail }) => {
            console.log(detail)
        }

        window.addEventListener(`lesson-${lessonId}`, handleComment)

        return () => {
            window.removeEventListener(`lesson-${lessonId}`, handleComment)
        }

    }, [lessonId])

    return(
        <div>
            <h1>Chat App</h1>
            <ul>
                {lessons.map(lesson => (
                    <li
                        key={lesson.id}
                        style={{
                            color: lessonId === lesson.id ? 'red' : '#333'
                        }}
                        onClick={() => setLessonId(lesson.id)}
                    >
                        {lesson.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ChatApp
```