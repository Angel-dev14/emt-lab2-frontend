import './App.css';
import {Component} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Categories from '../Categories/categories';
import Books from '../Books/BooksList/books';
import CategoriesService from '../../repository/categories-service';
import BooksService from '../../repository/books-service';
import BookCreate from '../Books/BookCreate/book-create';
import AuthorsService from '../../repository/authors-service';
import BookEdit from '../Books/BookEdit/book-edit';
import Header from '../Header/header';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      authors: [],
      books: [],
      selectedBook: {},
      currentPage: 0
    };
  }

  componentDidMount() {
    this.loadCategories();
    this.loadAuthors();
  }

  render() {
    return (
      <Router>
        <Header/>
        <main>
          <Routes>
            <Route path='/books/create' exact
                   element={<BookCreate categories={this.state.categories} authors={this.state.authors}
                                        createBook={this.createBook}/>}/>
            <Route path='/books/edit/:id'
                   element={<BookEdit categories={this.state.categories} authors={this.state.authors}
                                      onEdit={this.editBook} findBook={this.findBook}
                                      selectedBook={this.state.selectedBook}/>}/>
            <Route path={"/categories"} exact element={<Categories categories={this.state.categories}/>}/>
            <Route path={"/books"} exact element={
              <Books markAsTaken={this.markBookAsTaken}
                     onDelete={this.deleteBook}
                     loadBooks={this.loadBooks}
                     onPageChange={this.updateCurrentPage}
              />
            }/>
            <Route path='/' exact element={<Books books={this.state.books}/>}/>
          </Routes>
        </main>
      </Router>
    )
      ;
  }

  loadCategories = () => {
    CategoriesService.fetchCategories().then(data => data.data).then(categories => this.setState({
      categories
    }));
  };

  loadBooks = () => {
    return BooksService.fetchBooks(this.state.currentPage);
  };

  refreshBooks = () => {
    return BooksService.fetchBooks(this.state.currentPage).then(data => data.data).then(books => this.setState({books}));
  };

  loadAuthors = () => {
    AuthorsService.fetchAuthors().then(data => data.data).then(authors => this.setState({
      authors
    }));
  };

  createBook = (name, availableCopies, categoryType, authorId) => {
    const book = {
      name, availableCopies, categoryType, authorId
    };
    BooksService.createOrUpdateBook(book).then(() => this.refreshBooks());
  };

  editBook = (id, name, availableCopies, categoryType, authorId) => {
    const book = {
      id, name, availableCopies, categoryType, authorId
    };
    BooksService.createOrUpdateBook(book).then(() => this.refreshBooks());
  };

  findBook = (id) => {
    return BooksService.findById(id).then(data => data.data);
  };

  markBookAsTaken = (id) => {
    return BooksService.markBookAsTaken(id).then(() => this.refreshBooks());
  };

  deleteBook = (id) => {
    return BooksService.deleteBook(id).then(() => this.refreshBooks());
  };

  updateCurrentPage = (currentPage) => {
    this.setState({
      currentPage
    });
  };

}

export default App;