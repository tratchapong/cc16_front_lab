import { useState } from "react"
import RegisterForm from "./layouts/RegisterForm"
import LoginForm from "./layouts/LoginForm"
import useAuth from "./hooks/useAuth"
import AppRouter from "./routes/AppRouter"


function App() {
  const {user, setUser} = useAuth()
  const [dark, setDark] = useState(false)

  return (
    <div className="min-h-screen flex flex-col gap-3" data-theme={dark ? 'dark': 'cupcake'}>
      <AppRouter />
    </div>
  )
}

export default App
