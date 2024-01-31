import axios from 'axios'
import { useState, useEffect } from 'react'
import HomeworkCard from '../components/HomeworkCard'

function TeacherHome() {
  const [homework, setHomework] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect( ()=>{
    ( async () => {
      try {
        setLoading(true)
        let token = localStorage.getItem('token')
        const rs = await axios.get('http://localhost:8888/homework', {
          headers : { Authorization : `Bearer ${token}`}
        })
        setHomework(rs.data.homework)        
      }catch(err) {
        console.log(err)
      }finally {
        setLoading(false)
      }
    })()
  }, [] )

  if(loading) {
    return (
      <div className="text-4xl">Loading...</div>
    )
  }

  return (
    <div className='flex flex-col gap-2'>
      <h1 className="text-2xl text-center">All Homeworks </h1>

      <HomeworkCard homework={homework[0]} />
    </div>
  )
}

export default TeacherHome