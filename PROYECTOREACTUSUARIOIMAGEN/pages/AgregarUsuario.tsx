import React, { useState } from 'react';
import AgregarUsuarioForm from '../components/AgregarUsuarioForm';

const ModuloUsuario = () => {
    const [ Mensaje, setMensaje ] = useState('');

    const handleRegistro = async (formData: FormData) => {
        try {
            const response = await fetch('http://localhost:8000/usuarios', {
                method: 'POST',
                body:formData,
            });
            const data = await response.json();
            console.log("Datos que se van a enviar: ", data);
            setMensaje(data.msg || "Usuario registrado correctamente");
        } catch (error) {
            console.error(error);
            setMensaje("Error al registrar el usuario");           
        }
    };

    return (
        <>
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Módulo de Clientes</h1>
            <AgregarUsuarioForm onSubmit={handleRegistro} />
            {Mensaje && <p className="mt-4 text-center text-green-700">{Mensaje}</p>}
        </div>
    </>
    );
};

export default ModuloUsuario;