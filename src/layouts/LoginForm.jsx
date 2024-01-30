import { useState } from 'react'
import axios from 'axios'
import useAuth from '../hooks/useAuth'

export default function LoginForm() {
    const [input, setInput] = useState({
        code: '',
        password: '',
      })
    const {setUser} = useAuth()
    
      const hdlChangeInput = e => {
        setInput( prv => ({ ...prv, [e.target.name] : e.target.value }) )
      }
    
      const hdlSubmit = async e => {
        try {
          e.preventDefault()
          let codeFor = ( input.code.toLowerCase().startsWith('t')) ? 't_code' : 's_code'
          const output = {
            [codeFor] : input.code,
            password : input.password
          }
          console.log(output)
          const rs = await axios.post('http://localhost:8888/auth/login', output)
          // if(rs.status === 200) {}
          console.log(rs.data)
          localStorage.setItem('token', rs.data.token)
          const rs1 = await axios.get('http://localhost:8888/auth/me', {
            headers : { Authorization : `Bearer ${rs.data.token}`}
          })
          setUser(rs1.data.user)
        } catch(err) {
          console.log(err.message)
        }
        
      }
    
      return (
        <div className="hero bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold">Login</h1>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={hdlSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Enter your code</span>
                  </label>
                  <input type="text" placeholder="your code" className="input input-bordered" required
                    name="code" value={input.code} onChange={hdlChangeInput} 
                    pattern='^[st]\d{3}$'
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
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
}
