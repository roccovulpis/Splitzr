import Home from './pages/Home'
import Login from './pages/Login'
import SplitBill from './pages/SplitBill'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/split-bill" element={<SplitBill />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
