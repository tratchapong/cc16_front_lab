import { useState } from "react"
import RegisterForm from "./layouts/RegisterForm"
import LoginForm from "./layouts/LoginForm"
import useAuth from "./hooks/useAuth"


function App() {
  const {user, setUser} = useAuth()
  const [dark, setDark] = useState(false)

  return (
    <div className="min-h-screen flex flex-col gap-3" data-theme={dark ? 'dark': 'cupcake'}>
      <h1 className="text-3xl font-bold underline text-pink-600">
        Hello world!
      </h1>
      <input type="checkbox" className="toggle" checked={dark} onChange={e=>{setDark(e.target.checked)}} />
      <hr />
      {/* <RegisterForm /> */}
      <LoginForm />
    </div>
  )
}

export default App
