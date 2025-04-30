import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { DashboardPage } from './pages/DashboardPage'
import { AuditoriaPage } from './pages/AuditoriaPage'
import { PrivateLatout } from './layaout/PrivateLatout'
import { RegistroPage } from './pages/RegistroSoldaduraPage'
import { InventarioPage } from './pages/InventarioPage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardPage />} />
      


        <Route element={<PrivateLatout />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/registro' element={<RegistroPage/>}/>
          <Route path='/auditoria' element={<AuditoriaPage />} />
          <Route path='/inventario' element={<InventarioPage />} />
 
        </Route>


      </Routes>
      <Toaster />
    </BrowserRouter>






  )
}

export default App
