import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ShowAuthorPage() {
    const { id } = useParams();
    const [author, setAuthor] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAuthor();
    }, [id]);

    const fetchAuthor = async () => {
        try {
            const response = await fetch(`http://localhost:8000/authors/${id}`);
            const data = await response.json();
            setAuthor(data);
        } catch (error) {
            console.error("Ошибка при получении автора:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        navigate(`/authors/${id}/edit`);
    };

    if (loading) return <div>Загрузка...</div>

    return (
        <div className="container mt-3">
            <h1 className="text-center">Детали автора</h1>
            <div className="mb-3">
                <strong>Фамилия:</strong> {author.lastName}
            </div>
            <div className="mb-3">
                <strong>Имя:</strong> {author.firstName}
            </div>
            <div className="mb-3">
                <strong>Отчество:</strong> {author.middleName}
            </div>
            <button className="btn btn-primary" onClick={handleEdit}>Редактировать</button>
        </div>
    );
}
