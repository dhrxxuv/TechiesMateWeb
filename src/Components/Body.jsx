import { Outlet } from "react-router"
import { NavBar } from "./NavBar"
import { Footer } from "./Footer"
const Body = () => {
  return (
    <div>
        <NavBar/>
        <div className="mt-10">
            <Outlet />
        </div>
        <Footer/>
        
    </div>
  )
}

export default Body