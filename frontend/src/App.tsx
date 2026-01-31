import { Route, Routes } from "react-router"
import { Homepage } from "./Pages/Homepage"


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  )
}

export default App
