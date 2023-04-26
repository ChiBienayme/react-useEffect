import { useState } from  'react'

import Content from './components/Content'
import Resize from  './components/Resize'
import CountDown from './components/CountDown'
import CleanUp from './components/CleanUp'
import PreviewAvatar from './components/PreviewAvatar'
import ChatApp from './components/ChatApp'
import UseLayoutEffect from './components/UseLayoutEffect'

function App() {
  const [show, setShow] = useState(false)

  return (
    <div style={{ paddingLeft: 50 }}>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {/* {show && <Content/>} */}

      {/* <Resize/> */}
     
      {/* {show && <CountDown/>} */}

      {/* {show && <CleanUp/>} */}

      {/* {show && <PreviewAvatar/>} */}

      {/* {show && <ChatApp/>}  */}

      {show && <UseLayoutEffect/>} 
      
    </div>

  )
}

export default App
