import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseApi } from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { addToFeed } from '../Redux/feedSlice'
import { UserCard } from './userCard'

const Feed = () => {
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const userFeed = useSelector((store) => store.feed)

  const getFeed = async () => {
    if (userFeed?.user?.length > 0) return;

    try {
      const res = await axios.get(`${baseApi}/user/feed`, {
        withCredentials: true
      })

      dispatch(addToFeed(res.data))  
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong")
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Feed</h1>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <ul className="mt-4 space-y-4">
        {userFeed?.user?.map((item, idx) => (
          <UserCard key={idx} user={item} />
        ))}
      </ul>
    </div>
  )
}

export default Feed
