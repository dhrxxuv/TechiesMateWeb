import { Outlet, useNavigate } from "react-router"
import { NavBar } from "./NavBar"
import { Footer } from "./Footer"
import axios from "axios";
import { baseApi } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Redux/userSlice";
import { useEffect } from "react";

const Body = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const userData = useSelector((store)=>store.user)
  const fetchUser = async()=>{
    if(userData) return;

    try{
      const res = await axios.get(baseApi+"/profile/view",{
        withCredentials:true
      })
      console.log(res)
      
      dispatch(addUser(res.data.user));

      dispatch(addUser(res.user))
    }catch(err){
      console.log(err)
      if(err.status===401){
        navigate('/login')
      }
      dispatch(removeUser())
    }
  }

  useEffect(()=>{
    fetchUser()
  },[])

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