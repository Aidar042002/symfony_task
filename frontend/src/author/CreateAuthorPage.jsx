import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAuthorPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const author = { firstName, lastName, middleName };

        try {
            await fetch('http://localhost:8000/authors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(author),
            });
            navigate('/authors');
        } catch (error) {
            console.error("Ошибка при создании автора:", error);
        }
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center">Создать нового автора</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Имя</label>
                    <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Фамилия</label>
                    <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Отчество</label>
                    <input type="text" className="form-control" value={middleName} onChange={(e) => setMiddleName(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Создать</button>
            </form>
        </div>
    );
}
