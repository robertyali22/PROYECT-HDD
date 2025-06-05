import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { DashboardPage } from './pages/DashboardPage'
import { AuditoriaPage } from './pages/AuditoriaPage'
import { PrivateLatout } from './layaout/PrivateLatout'
import { RegistroPage } from './pages/RegistroSoldaduraPage'
import { InventarioPage } from './pages/InventarioPage'
import { GestionUsuarioPage } from './pages/GestionUsuarioPage'
import { AsignacionTareasPage } from './pages/AsignacionTareasPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz sin NavBar */}
        <Route path='/' element={<DashboardPage />} />
        
        {/* Rutas con NavBar usando el layout */}
        <Route element={<PrivateLatout />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/registro' element={<RegistroPage/>}/>
          <Route path='/auditoria' element={<AuditoriaPage />} />
          <Route path='/inventario' element={<InventarioPage />} />

          <Route path='/usuarios' element={<GestionUsuarioPage />} />
          <Route path='/asignacion' element={<AsignacionTareasPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App