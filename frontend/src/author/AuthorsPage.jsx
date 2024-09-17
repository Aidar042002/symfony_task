import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function AuthorsPage(){

    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] =useState(true);

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await fetch('http://localhost:8000/authors');
            const data = await response.json();
            setAuthors(data);
        } catch (error) {
            console.error("Ошибка при получении книг:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteAuthor = async (id) => {
        try {
            await fetch(`http://localhost:8000/authors/${id}`, { method: 'DELETE' });
            setAuthors(authors.filter(book => book.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении книги:", error);
        }
    };

    return (
        <div className="container mt-3 text-center">
            <h1 className="text-center">Авторы</h1>
            {!loading?
            <table className="table">
                <thead>
                <tr>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                </tr>
                </thead>
                <tbody>
                {authors.map(author => (
                    <tr key={author.id}>
                        <td>{author.lastName}</td>
                        <td>{author.firstName}</td>
                        <td>{author.middleName}</td>
                        <td>
                            <button className="btn btn-danger m-2" onClick={() => deleteAuthor(author.id)}>Удалить</button>
                            <Link to={`/authors/${author.id}`} className="btn btn-success m-2">Показать</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>:<div className="text-center">Загрузка...</div>}
            <Link to="/authors/create" className="btn btn-primary">Создать нового автора</Link>
        </div>
    );
}