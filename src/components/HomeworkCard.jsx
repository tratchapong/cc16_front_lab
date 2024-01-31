import axios from 'axios'
import React from 'react'

export default function HomeworkCard(props) {
  const { homework, openEdit, setReload } = props
  const { id, question, startdate, duedate, published, subject } = homework

  const formatDate = (d) => {
    return new Intl.DateTimeFormat("th-TH", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(d)
  }
  const hdlDelete = async (e) => {
    try {
      e.stopPropagation()
      const token = localStorage.getItem('token')
      const rs = await axios.delete(`http://localhost:8888/homework/${id}`,{
        headers : { Authorization : `Bearer ${token}`}
      })
      setReload(prv=>!prv)
      
    }catch(err) {
      console.log(err.message)
    }

  }
  return (
    <div className="card w-5/6 border mx-auto hover:shadow"
      onClick={()=>openEdit(homework)}>
      <div className="card-body gap-4">
        <div className="flex justify-between">
          <div className="text-xl">{subject.title}  
            <small className={`border rounded ms-3 p-1 text-xs ${ published?'bg-info' : '' }` }>
              {!published && 'Un-' }Published
            </small>
          </div>
          <div className="badge badge-error badge-outline cursor-pointer"
            onClick={hdlDelete}
          >delete</div>
        </div>
        <div className="flex justify-between">
          <p> start : {formatDate(new Date(startdate))}</p>
          <p className='text-right'> due date : {formatDate(new Date(duedate))}</p>
        </div>
        <p className='text-lg'>{question}</p>
      </div>
    </div>
  )
}

