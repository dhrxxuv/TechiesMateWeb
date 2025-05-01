import { BrowserRouter, Routes,Route } from 'react-router'
import './App.css'
import Body from './Components/Body'
import LogIn from './Components/LogIn'
import Profile from './Components/Profile'

function App() {
  return (
    <>

      <BrowserRouter basename="/">
        <Routes>
          <Route path='/' element={<Body/>}> 
          <Route path='/login' element={<LogIn/>}/> 
          <Route path='/profile' element={<Profile/>}/> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
