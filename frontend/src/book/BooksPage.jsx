import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BooksPage(){

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:8000/books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error("Ошибка при получении книг:", error);
        }finally {
            setLoading(false);
        }
    };

    const deleteBook = async (id) => {
        try {
            await fetch(`http://localhost:8000/books/${id}`, { method: 'DELETE' });
            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            console.error("Ошибка удаления книги:", error);
        }
    };


    return (
        <div className="container text-center">
        <h1 className="text-center">Книги</h1>
        <table className="table">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Год</th>
                    <th>ISBN</th>
                    <th>Страницы</th>
                    <th>Авторы</th>
                    <th>Действия</th>
                </tr>
            </thead>
            {loading ?<div className="text-center"><strong>Загрузка...</strong></div>:
            <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.year}</td>
                        <td>{book.isbn}</td>
                        <td>{book.pages}</td>
                        <td>
                            {book.authors && book.authors.length > 0 ? (
                                book.authors.map(author => (
                                    <div key={author.id}>
                                        {author.firstName} {author.middleName} {author.lastName}
                                    </div>
                                ))
                            ) : (
                                <div>Нет авторов</div>
                            )}
                        </td>
                        <td>
                            <button className="btn btn-danger m-2" onClick={() => deleteBook(book.id)}>Удалить</button>
                            <Link to={`/books/${book.id}`} className="btn btn-success m-2">Показать</Link>
                        </td>
                    </tr>
                ))}
            </tbody>}
        </table>
        <Link to="/books/create" className="btn btn-primary">Создать новую книгу</Link>
    </div>
    );
}