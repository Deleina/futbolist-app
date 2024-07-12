import React, { useState, useEffect } from 'react';

interface FutbolistDTO {
    id: number;
    nombres: string;
    apellidos: string;
    fechaNacimiento: string;
    caracteristicas: string;
    posicion: string;
}


const FutbolistasList = () => {

    const [futbolistas, setFutbolistas] = useState<FutbolistDTO[]>([]);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        fetch('http://localhost:8080/futbolista?page=0&size=20')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setFutbolistas(data))
            .catch(error => setError(error.message));
    }, []);



    const handleRowClick = (id: number) => {
        fetch(`http://localhost:8080/futbolista/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert(`
            ID: ${data.id}
            Nombres: ${data.nombres}
            Apellidos: ${data.apellidos}
            Fecha de Nacimiento: ${data.fechaNacimiento}
            Características: ${data.caracteristicas}
            Posición: ${data.posicion}
          `);
            })
            .catch(error => setError(error.message));
    }
    if (error) return <div>Error: {error}</div>;


    return (
        <div className="container mt-2">
            <h1 className="mb-4">Lista de Futbolistas</h1>
            <table className="table table-striped-columns">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Características</th>
                        <th>Posición</th>
                    </tr>
                </thead>
                <tbody>
                    {futbolistas.map(futbolista => (
                        <tr key={futbolista.id}
                            onClick={() => handleRowClick(futbolista.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{futbolista.id}</td>
                            <td>{futbolista.nombres}</td>
                            <td>{futbolista.apellidos}</td>
                            <td>{futbolista.fechaNacimiento}</td>
                            <td>{futbolista.caracteristicas}</td>
                            <td>{futbolista.posicion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FutbolistasList;
