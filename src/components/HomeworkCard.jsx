import React from 'react'

export default function HomeworkCard(props) {
  const { homework } = props
  const { question, startdate, duedate, published, subject } = homework
  return (
    <div className="card w-5/6 border mx-auto hover:shadow">
      <div className="card-body gap-4">
        <div className="flex justify-between">
          <div className="text-xl">{subject.title}  
            <small className='border rounded ms-3'>{!published && 'Un-' }Published</small>
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

// {
//   "id": 2,
//   "question": "CSS Selector",
//   "imgUrl": null,
//   "startdate": "2024-01-31T00:00:00.000Z",
//   "duedate": "2024-02-03T00:00:00.000Z",
//   "published": false,
//   "subject_id": 2,
//   "teacher_id": 2,
//   "subject": {
//     "title": "CSS"
//   }
// },