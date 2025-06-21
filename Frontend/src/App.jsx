import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { DashboardPage } from './pages/DashboardPage'
import { AuditoriaPage } from './pages/AuditoriaPage'
import { RegistroPage } from './pages/RegistroSoldaduraPage'
import { InventarioPage } from './pages/InventarioPage'
import { GestionUsuarioPage } from './pages/GestionUsuarioPage'
import { AsignacionTareasPage } from './pages/AsignacionTareasPage'
import { Pruebas } from './pages/Pruebas' 
import { Usuarios } from './pages/Usuarios' 


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/registro' element={<RegistroPage/>}/>
          <Route path='/auditoria' element={<AuditoriaPage />} />
          <Route path='/inventario' element={<InventarioPage />} />
          <Route path='/usuarios' element={<GestionUsuarioPage />} />
          <Route path='/asignacion' element={<AsignacionTareasPage />} />
          <Route path='/pruebas' element={<Pruebas />} />

      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App