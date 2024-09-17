import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ShowBookPage() {
    const [book, setBook] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchBook();
    }, [id]);

    const fetchBook = async () => {
        try {
            const response = await fetch(`http://localhost:8000/books/${id}`);
            const data = await response.json();
            setBook(data);
        } catch (error) {
            console.error("Ошибка при получении книги:", error);
        }
    };

    if (!book) {
        return <div>Загрузка...</div>;
    }

    const handleUpdate = () => {
        navigate(`/books/${id}/edit`);
    };

    return (
        <div className="container mt-3">
            <h1>Данные книги</h1>
            <div className="mb-3">
                <strong>Название:</strong> {book.title}
            </div>
            <div className="mb-3">
                <strong>Год:</strong> {book.year}
            </div>
            <div className="mb-3">
                <strong>ISBN:</strong> {book.isbn}
            </div>
            <div className="mb-3">
                <strong>Страницы:</strong> {book.pages}
            </div>
            <div className="mb-3">
                <strong>Авторы:</strong>
                {book.authors && book.authors.length > 0 ? (
                    <ul>
                        {book.authors.map(author => (
                            <li key={author.id}>
                                {author.firstName} {author.middleName} {author.lastName}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Авторы не указаны</p>
                )}
            </div>
            <button className="btn btn-primary" onClick={handleUpdate}>Обновить</button>
        </div>
    );
}
