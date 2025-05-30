import React, { useState } from 'react';
import AgregarUsuarioForm from '../components/AgregarUsuarioForm';

const ModuloUsuario = () => {
    const [Mensaje, setMensaje] = useState('');
    const [dataUsers, setDataUsers] = React.useState<Users[]>([]);

    const handleRegistro = async (formData: FormData) => {
        try {
            const response = await fetch('http://localhost:8000/usuarios', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log("Datos que se van a enviar: ", data);
            setMensaje(data.msg || "Usuario registrado correctamente");
        } catch (error) {
            console.error(error);
            setMensaje("Error al registrar el usuario");
        }
    };

    React.useEffect(() => {
        fetch('http://localhost:8000/usuarios')
            .then(response => response.json())
            .then(dataResponse => setDataUsers(dataResponse.data.map((row: { idUsuario: any }) => ({ ...row, id: row.idUsuario }))))
            .catch(error => console.error('Error al obtener datos', error));
    }, []);

    const columns: GridColDef[] = [
        { field: "idUsuario", headerName: "#", width: 70 },
        { field: "nombre", headerName: "Nombres", width: 146 },
        { field: "apellido", headerName: "Apellidos", width: 146 },
        { field: "email", headerName: "Email", width: 200 }
        { field: "foto", headerName: "Foto", width: 200 }
    ]

    const handleEdit = (row: Users) => {
        console.log(row);
    }

    const handleDelete = (id: number) => {
        console.log(id);
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Módulo de Clientes</h1>
                <AgregarUsuarioForm onSubmit={handleRegistro} />
                {Mensaje && <p className="mt-4 text-center text-green-700">{Mensaje}</p>}
            </div>

            <Grid container spacing={2} marginTop={5}>
                <Grid size={10}>
                    <DinamicTable rows={dataUsers} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
                </Grid>
            </Grid>
        </>
    );
};

export default ModuloUsuario;