import React, { useEffect, useState } from "react";

export default function AuthorSelect({ selectedAuthors, onChange }) {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('http://localhost:8000/authors'); // Предполагаем, что этот эндпоинт возвращает список авторов
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                console.error("Ошибка при получении авторов:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    const handleCheckboxChange = (e) => {
        const authorId = e.target.value;
        if (e.target.checked) {
            onChange([...selectedAuthors, authorId]);
        } else {
            onChange(selectedAuthors.filter(id => id !== authorId));
        }
    };

    if (loading) return <div>Загрузка авторов...</div>;

    return (
        <div className="mb-3">
            <label className="form-label">Выберите авторов:</label>
            {authors.map(author => (
                <div key={author.id} className="form-check">
                    <input type="checkbox" className="form-check-input" value={author.id} onChange={handleCheckboxChange} checked={selectedAuthors.includes(author.id)}/>
                    <label className="form-check-label">
                        {author.firstName} {author.middleName} {author.lastName}
                    </label>
                </div>
            ))}
        </div>
    );
}
