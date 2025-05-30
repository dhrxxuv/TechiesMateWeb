import { BrowserRouter, Routes,Route } from 'react-router'
import './App.css'
import Body from './Components/Body'
import Feed from './Components/Feed'
import LogIn from './Components/LogIn'
import Profile from './Components/Profile'
import Connection from './Components/Connection'
import ConnectionRequest from './Components/ConnectionRequest'
import Chat from './Components/Chat'
import { Provider } from 'react-redux'
import appStore from './Redux/appStore'


function App() {
  return (
        <Provider store={appStore}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path='/' element={<Body/>}> 
              <Route path='/' element={<Feed/>}/> 
              <Route path='/login' element={<LogIn/>}/> 
              <Route path='/profile' element={<Profile/>}/> 
              <Route path='/Connection' element={<Connection/>}/>
              <Route path='/Connection-Request' element={<ConnectionRequest/>}/>
              <Route path='/chat/:targetUserId' element={<Chat/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
  )
}

export default App
