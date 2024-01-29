import { useState } from 'react'
import axios from 'axios'

export default function RegisterForm() {
  const [input, setInput] = useState({
    s_code: '',
    firstname: '',
    email: '',
    password: '',
    consfirmPassword: ''
  })

  const hdlChangeInput = e => {
    setInput( prv => ({ ...prv, [e.target.name] : e.target.value }) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      const rs = await axios.post('http://localhost:8888/auth/register', input)
    } catch(err) {
      console.log(err.message)
    }

  }

  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Register new student</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={hdlSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Student Code</span>
              </label>
              <input type="text" placeholder="your code" className="input input-bordered" required
                name="s_code" value={input.s_code} onChange={hdlChangeInput} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">FirstName</span>
              </label>
              <input type="text" placeholder="firstname" className="input input-bordered" required 
                name="firstname" value={input.firstname} onChange={hdlChangeInput}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">E-mail</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered"  
                name="email" value={input.email} onChange={hdlChangeInput}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" required
               name="password" value={input.password} onChange={hdlChangeInput} 
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input type="password" placeholder="confirm password" className="input input-bordered" required 
              name="confirmPassword" value={input.confirmPassword} onChange={hdlChangeInput} 
              />

            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
