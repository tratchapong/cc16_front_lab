import axios from 'axios'
import { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function HomeworkForm() {
  const [subject, setSubject] = useState([])
  const [input, setInput] = useState({
    subject_id: "",
    question: "",
    startdate: new Date(),
    duedate: new Date(),
    published: false
  })

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    const run = async () => {
      const rs = await axios.get('http://localhost:8888/subject')
      console.log(rs.data.subjects)
      setSubject(rs.data.subjects)
    }
    run()
  }, [])

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      const token = localStorage.getItem('token')
      const rs= await axios.post('http://localhost:8888/homework', input, {
        headers : { Authorization : `Bearer ${token}` }
      })
      alert('Add new homework : ok')
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col gap-3 min-w-[600px] w-4/6 border mx-auto p-3 rounded">
      <h1 className='text-4xl'>New Homework</h1>
      <form className='flex flex-col gap-2' onSubmit={hdlSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Select Subject</span>
          </div>
          <select className="select select-bordered" value={input.subject_id}
            onChange={hdlChange} name="subject_id"
          >
            <option disabled value="">Pick one</option>
            {subject.map(el => (
              <option key={el.id} value={el.id} >{el.title}</option>
            ))}
          </select>
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Question</span>
          </div>
          <textarea className="textarea textarea-bordered h-24" placeholder="Bio"
              name="question" value={input.question} onChange={hdlChange}
          ></textarea>
        </label>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-5">
            <span className="label-text">Published</span>
            <input type="checkbox" className="toggle toggle-primary"
              checked={input.published}  
              onChange={ e => setInput( prv => ({ ...prv, published: !prv.published }) )}
            />
          </label>
        </div>
        <div className="flex justify-between px-3">
          <div className="form-control">
            <div className="label">
              <span className="label-text">Start date</span>
            </div>
            {/* <input type="date" name="startdate" value={input.startdate} onChange={hdlChange} />  */}
            <DatePicker 
              dateFormat="dd/MM/yyyy"
              selected={input.startdate}
              onChange={(date) => setInput( prv => ({ ...prv, startdate: date}) )}
            />
          </div>
          <div className="form-control">
            <div className="label">
              <span className="label-text">Due date</span>
            </div>
            <DatePicker 
              dateFormat="dd/MM/yyyy"
              selected={input.duedate}
              onChange={(date) => setInput( prv => ({ ...prv, duedate: date}) )}
            />
          </div>
        </div>
        <button type='submit' className="btn btn-outline btn-secondary mt-[250px]">Submit</button>

      </form>
    </div>
  )
}
