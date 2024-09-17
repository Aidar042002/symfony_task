import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorSelect from "./AuthorSelect";

export default function CreateBookPage() {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [isbn, setIsbn] = useState('');
    const [pages, setPages] = useState('');
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const book = { title, year, isbn, pages, authors };
        try {
            await fetch('http://localhost:8000/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });
            navigate('/books');
        } catch (error) {
            console.error("Ошибка при создании книги:", error);
        }
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center">Создать новую книгу</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Название</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Год</label>
                    <input type="number" className="form-control" value={year} onChange={(e) => setYear(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">ISBN</label>
                    <input type="text" className="form-control" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Страницы</label>
                    <input type="number" className="form-control" value={pages} onChange={(e) => setPages(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Авторы</label>
                    <input type="text" className="form-control" value={authors} onChange={(e) => setAuthors(e.target.value.split(','))} />
                </div>
                <AuthorSelect selectedAuthors={authors} onChange={setAuthors} />
                <button type="submit" className="btn btn-primary">Создать</button>
            </form>
        </div>
    );
}
