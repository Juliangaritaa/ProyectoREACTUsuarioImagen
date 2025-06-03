import SubirProductosForm from "../components/SubirProductosForm";

const AgregarProductoMasivo = () => {
    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("archivo", file);

        try {
            const response = await fetch("http://localhost:8000/productos", {
                method: "POST",
                body: formData,
            });
            console.log("Cuerpo de la soliciud: ", formData);
            if (!response.ok) {
                throw new Error("Erro al subir el archivo");
            }
            const result = await response.json();
            alert(`✅ Productos subidos: ${result.insertados}`);
        } catch (error) {
            console.error(error);
            alert("❌ Hubo un error al subir los productos.");
        }
    };

    return(
        <>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Carga masiva de productos</h1>
                <SubirProductosForm onUpload={handleUpload} />
            </div>
        </>
    );
};

export default AgregarProductoMasivo;