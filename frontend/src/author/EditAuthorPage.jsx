import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAuthorPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAuthor();
    }, [id]);

    const fetchAuthor = async () => {
        try {
            const response = await fetch(`http://localhost:8000/authors/${id}`);
            const data = await response.json();
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setMiddleName(data.middleName);
        } catch (error) {
            console.error("Ошибка при получении автора:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedAuthor = { firstName, lastName, middleName };

        try {
            await fetch(`http://localhost:8000/authors/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAuthor),
            });
            navigate('/authors');
        } catch (error) {
            console.error("Ошибка при обновлении автора:", error);
        }
    };

    if(!firstName || !lastName || !middleName) return <div>Загрузка...</div>

    return (
        <div className="container mt-3">
            <h1 className="text-center">Редактировать автора</h1>
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
                    <input type="text" className="form-control" value={middleName} onChange={(e) => setMiddleName(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Обновить</button>
            </form>
        </div>
    );
}
