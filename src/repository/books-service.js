import axios from '../custom-axios/axios';

const BooksService = {
  findById: (id) => {
    return axios.get(`/books/${id}`);
  },
  fetchBooks: (currentPage) => {
    return axios.get(`/books/paginated?page=${currentPage}&size=5`);
  },
  createOrUpdateBook: (book) => {
    return axios.post("/books/create-or-update", {
      ...book
    });
  },
  markBookAsTaken: (id) => {
    return axios.put(`/books/mark-as-taken/${id}`);
  },
  deleteBook: (id) => {
    return axios.delete(`/books/delete/${id}`);
  }
};

export default BooksService;