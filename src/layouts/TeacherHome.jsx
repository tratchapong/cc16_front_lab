import axios from 'axios'
import { useState, useEffect } from 'react'
import HomeworkCard from '../components/HomeworkCard'
import ModalEditForm from './ModalEditForm'

function TeacherHome() {
  const [homework, setHomework] = useState([])
  const [loading, setLoading] = useState(true)
  const [editData, setEditData] = useState({})
  const [reload, setReload] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        let token = localStorage.getItem('token')
        const rs = await axios.get('http://localhost:8888/homework', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setHomework(rs.data.homework)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [reload])

  const openEdit = (el) => {
    document.getElementById('edit_modal').showModal()
    setEditData(el)
  }
  const closeEdit = (el) => {
    document.getElementById('edit_modal').close()
    setEditData(el)
  }


  if (loading) {
    return (
      <div className="text-4xl">Loading...</div>
    )
  }

  return (
    <div className='flex flex-col gap-2'>
      <h1 className="text-2xl text-center">All Homeworks </h1>
      {homework.map(el => (
        <HomeworkCard key={el.id} homework={el} openEdit={openEdit}/>
      ))

      }
      <>
        <dialog id="edit_modal" className="modal">
          <div className="modal-box">
            {editData?.id && <ModalEditForm editData={editData} closeEdit={closeEdit} setReload={setReload}/>} 
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    </div>
  )
}

export default TeacherHome