import React from 'react';

export default function Navbar(){

    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Главная</a>
                                </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/authors">Авторы</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Книги</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}