import React from 'react'

export default function HomeworkCard(props) {
  const { homework, openEdit } = props
  const { question, startdate, duedate, published, subject } = homework
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
          <div className="badge badge-error badge-outline">delete</div>
        </div>
        <div className="flex justify-between">
          <p> start : {startdate}</p>
          <p className='text-right'> due date : {duedate}</p>
        </div>
        <p className='text-lg'>{question}</p>
      </div>
    </div>
  )
}

