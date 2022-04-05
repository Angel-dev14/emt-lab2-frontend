import {Link} from 'react-router-dom';

const BookItem = (props) => {
  const book = props.book;
  return (
    <tr key={book.id}>
      <td>
        {book.name}
      </td>
      <td>
        {book.categoryType}
      </td>
      <td>
        {book.author.name} {book.author.surname}
      </td>
      <td>
        {book.availableCopies}
      </td>
      <td>
        <button className={"btn btn-outline-dark me-1"} onClick={() => props.markAsTaken(book.id)}>Mark as taken
        </button>
        <Link to={`/books/edit/${book.id}`} className={"btn btn-warning me-1"}
              onClick={() => props.onEdit(book.id)}>Edit</Link>
        <button className={"btn btn-danger"} onClick={() => props.onDelete(book.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default BookItem;