import { useState } from "react"
import useAuth from "./hooks/useAuth"
import AppRouter from "./routes/AppRouter"


function App() {
  const {loading} = useAuth()
  const [dark, setDark] = useState(false)

  if(loading) {
    return (
      <span className="loading loading-ring loading-lg scale-150"></span>
    )
  }

  return (
    <div className="min-h-screen flex flex-col gap-3" >
      <AppRouter />
    </div>
  )
}

export default App
