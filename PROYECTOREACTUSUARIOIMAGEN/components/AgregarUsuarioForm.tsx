import React, { FormEvent, useState } from 'react';

type Props = {
  onSubmit: (formData: FormData) => void;
};

const AgregarUsuarioForm: React.FC<Props> = ({ onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    if (foto) formData.append('foto', foto);
    onSubmit(formData);
  };

  return (
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow w-full max-w-md mx-auto bg-white mt-6">
          <h2 className="text-2xl font-bold mb-4">
              Registrar Usuarios
          </h2>

          <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required>
          </input>

          <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required>
          </input>

          <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required>
          </input>

          <input
              type='file'
              onChange={(e) => setFoto(e.target.files?.[0] || null)}
              className='w-full p-2 border rounded mb-4'>
          </input>

          <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Registrar
          </button>
      </form>
  );
};

export default AgregarUsuarioForm;