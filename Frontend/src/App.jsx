import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './App.css'
import { DashboardPage } from './pages/DashboardPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <DashboardPage /> } />
     
        <Route path='/dashboard' element={ <DashboardPage /> } />
    

      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
