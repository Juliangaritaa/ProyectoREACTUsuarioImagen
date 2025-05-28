import './App.css'
import Navbar from '../components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import ModuloUsuario from '../pages/AgregarUsuario';
import AgregarProductoMasivo from '../pages/AgregarProductoMasivo';

function App(){
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/AgregarUsuario' element={<ModuloUsuario />} />
                <Route path='/AgregarProductoMasivo' element={<AgregarProductoMasivo/>} />
            </Routes>
        </Router>
    )
}

export default App
