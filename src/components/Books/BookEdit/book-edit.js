import {Link, useNavigate, useParams, withRouter} from 'react-router-dom';
import {React, useState, useEffect} from 'react';

const BookEdit = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [formData, updateFormData] = useState({
    id: params.id,
    name: '',
    availableCopies: 0,
    categoryType: '',
    authorId: 0
  });

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  useEffect(() => {
    props.findBook(params.id).then(book => {
      updateFormData({
        id: book.id,
        name: book.name,
        availableCopies: book.availableCopies,
        categoryType: book.categoryType,
        authorId: book.author.id
      });
    });
  }, [params.id, props]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const id = formData.id;
    const name = formData.name;
    const availableCopies = formData.availableCopies;
    const categoryType = formData.categoryType;
    const authorId = formData.authorId;
    props.onEdit(id, name, availableCopies, categoryType, authorId);
    navigate('/books');
  };

  return (
    <div className={"container"}>
      <div className={"row"}>
        <form onSubmit={onFormSubmit}>
          <input type='hidden' value={formData.id}/>
          <div className='form-group col-4 mt-3'>
            <label htmlFor='bookName'>Name</label>
            <input type='text' name='name' className='form-control mt-1' id='bookName'
                   onChange={handleChange} defaultValue={formData.name} required={true}/>
          </div>
          <div className='form-group col-4'>
            <label htmlFor='availableCopies'>Available Copies</label>
            <input type='number' name='availableCopies' className='form-control mt-1'
                   id='availableCopies' onChange={handleChange} value={formData.availableCopies}
                   required={true}/>
          </div>
          <div className='form-group col-4'>
            <label htmlFor='authors'>Author</label>
            <select name='authorId' required={true} className='form-control mt-1' id='authors'
                    onChange={handleChange} value={formData.authorId}>
              {props.authors.map(author => {
                return (
                  <option key={author.id} value={author.id}>{author.name} {author.surname}</option>
                );
              })
              }
            </select>
          </div>
          <div className='form-group col-4'>
            <label htmlFor='bookCategories'>Category</label>
            <select name='categoryType' required={true} className='form-control mt-1' id='bookCategories'
                    onChange={handleChange} value={formData.categoryType}>
              {props.categories.map(category => {
                return (
                  <option key={category} value={category}>{category}</option>
                );
              })}
            </select>
          </div>
          <button type='submit' className='btn btn-primary mt-3'>Submit</button>
          <Link to={"/books"} className='btn btn-secondary mt-3 ms-1'>Back</Link>
        </form>
      </div>
    </div>
  );
};

export default BookEdit;