import React, { useRef } from "react";

interface Props {
    onUpload: (file:File) =>void;
}

const SubirProductosForm: React.FC<Props> = ({ onUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow w-fit">
      <h2 className="text-lg font-semibold mb-2">Subida masiva de productos </h2>
      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        className="mb-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Subir
      </button>
    </form>
    );
};

export default SubirProductosForm;