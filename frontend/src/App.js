import './App.css';
import Header from './components/header';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Routes} from "react-router";
import BooksPage from './book/BooksPage';
import AuthorsPage from './author/AuthorsPage';
import CreateBookPage from "./book/CreateBookPage";
import ShowBookPage from "./book/ShowBookPage";
import EditBookPage from "./book/EditBookPage";
import CreateAuthorPage from "./author/CreateAuthorPage";
import EditAuthorPage from "./author/EditAuthorPage";
import ShowAuthorPage from "./author/ShowAuthorPage";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
          <Route path="/" element={<BooksPage/>}/>
          <Route path="/books" element={<BooksPage/>}/>
          <Route path="/books/create" element={<CreateBookPage />}/>
          <Route path="/books/:id" element={<ShowBookPage />}/>
          <Route path="/books/:id/edit" element={<EditBookPage />}/>
          <Route path="/authors" element={<AuthorsPage/>}/>
          <Route path="/authors/create" element={<CreateAuthorPage/>}/>
          <Route path="/authors/:id/edit" element={<EditAuthorPage/>}/>
          <Route path="/authors/:id" element={<ShowAuthorPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
