import axios from "axios"
import { baseApi } from "../utils/api"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../Redux/connectionSlic"

const Connection = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.Connection || []);
    
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseApi}/user/connections`, {
          withCredentials: true
        });
        dispatch(addConnection(res.data.data));
      } catch (err) {
        console.log("Error fetching connections:", err?.response?.data);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    if (!connections) {
      // Shimmer/loading state
      return <div className="animate-pulse">Loading connections...</div>;
    }
  
    if (connections.length === 0) {
      return (
        <div className="flex justify-center items-center h-64">
          <h1 className="text-xl text-gray-600">No connections found</h1>
        </div>
      );
    }
  
    return (
      <div >
        <h1 className="text-3xl font-bold mb-6">Your Connections</h1>
          {connections.map((connection, index) => (
            <div 
              key={connection._id || index} >
              <h2 className="text-xl font-semibold">
                {connection.firstName} {connection.lastName}
              </h2>
            </div>
          ))}
        </div>
    );
  };
  
  export default Connection;