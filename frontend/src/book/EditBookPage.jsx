import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBookPage() {
    const [book, setBook] = useState(null);
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [isbn, setIsbn] = useState('');
    const [pages, setPages] = useState('');
    const [authors, setAuthors] = useState([]);
    const [allAuthors, setAllAuthors] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchBook();
        fetchAuthors();
    }, [id]);

    const fetchBook = async () => {
        try {
            const response = await fetch(`http://localhost:8000/books/${id}`);
            const data = await response.json();
            setBook(data);
            setTitle(data.title);
            setYear(data.year);
            setIsbn(data.isbn);
            setPages(data.pages);
            setAuthors(data.authors.map(author => author.id));
        } catch (error) {
            console.error("Ошибка при получении книги:", error);
        }
    };

    const fetchAuthors = async () => {
        try {
            const response = await fetch('http://localhost:8000/authors');
            const data = await response.json();
            setAllAuthors(data);
        } catch (error) {
            console.error("Ошибка при получении авторов:", error);
        }
    };

    const handleAuthorChange = (authorId) => {
        if (authors.includes(authorId)) {
            setAuthors(authors.filter(id => id !== authorId));
        } else {
            setAuthors([...authors, authorId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedBook = {title, year: parseInt(year, 10), isbn, pages: parseInt(pages, 10), authors};

        try {
            const response = await fetch(`http://localhost:8000/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            });

            if (response.ok) {
                navigate('/books');
            } else {
                const errorData = await response.json();
                console.error("Ошибка при обновлении книги:", errorData);
            }
        } catch (error) {
            console.error("Ошибка при обновлении книги:", error);
        }
    };

    if (!book) return <div>Загрузка...</div>;

    return (
        <div className="container mt-3">
            <h1 className="text-center">Редактировать книгу</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Название</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Год</label>
                    <input type="number" className="form-control" value={year} onChange={(e) => setYear(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">ISBN</label>
                    <input type="text" className="form-control" value={isbn} onChange={(e) => setIsbn(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Страницы</label>
                    <input type="number" className="form-control" value={pages} onChange={(e) => setPages(e.target.value)} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Авторы</label>
                    <div>
                        {allAuthors.map(author => (
                            <div key={author.id} className="form-check">
                                <input type="checkbox" className="form-check-input" id={`author-${author.id}`} checked={authors.includes(author.id)} onChange={() => handleAuthorChange(author.id)}/>
                                <label className="form-check-label" htmlFor={`author-${author.id}`}>
                                    {author.firstName} {author.lastName}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Обновить</button>
            </form>
        </div>
    );
}
