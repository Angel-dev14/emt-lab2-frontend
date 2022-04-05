import {Link} from 'react-router-dom';
import BookItem from '../BookItem/book-item';
import {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';

const Books = (props) => {

  const [books, setBooks] = useState([]);

  const [pageCount, setPageCount] = useState(0);

  const size = 5;

  useEffect(() => {
    props.loadBooks().then(response => {
      const total = response.headers["total-elements"];
      setPageCount(Math.ceil(total / size));
      setBooks(response.data);
    });
  }, [props, size]);

  const handlePageClick = (data) => {
    let currentPage = data.selected;
    props.onPageChange(currentPage);
    props.loadBooks().then(response => response.data).then(books => setBooks(books));
  };

  return (
    <div className={"container"}>
      <div className={"d-flex justify-content-end mt-4"}>
        <Link className={'btn btn-primary'} to={'/books/create'}>Add a new book</Link>
      </div>
      <table className={"table"}>
        <thead>
        <tr>
          <th scope={"col"}>Name</th>
          <th scope={"col"}>Category Type</th>
          <th scope={"col"}>Author</th>
          <th scope={"col"}>Available Copies</th>
          <th scope={"col"}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {books.map(book => {
          return (
            <BookItem
              key={book.id}
              book={book}
              onEdit={props.onEdit}
              markAsTaken={props.markAsTaken}
              onDelete={props.onDelete}
            />
          );
        })}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Books;