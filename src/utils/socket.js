import io from 'socket.io-client'
import { baseApi } from './api'


export const createSocketConnection = ()=>{
    if(window.location.hostname === 'localhost'){
    return io(baseApi)
    }
    else {
        return io("/",{path:"/api/socket.io"})
    }
}