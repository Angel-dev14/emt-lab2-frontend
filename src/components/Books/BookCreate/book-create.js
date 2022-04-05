import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const BookCreate = (props) => {

  const [formData, updateFormData] = React.useState(
    {
      name: '',
      availableCopies: 0,
      categoryType: '',
      authorId: 0
    }
  );

  const navigate = useNavigate();

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const name = formData.name;
    const availableCopies = formData.availableCopies;
    const categoryType = formData.categoryType;
    const authorId = formData.authorId;
    props.createBook(name, availableCopies, categoryType, authorId);
    navigate('/books');
  };

  return (
    <div className={"container"}>
      <div className={"row"}>
        <form onSubmit={onFormSubmit}>
          <div className='form-group col-4 mt-3'>
            <label htmlFor='bookName'>Name</label>
            <input type='text' name='name' className='form-control mt-1' id='bookName'
                   placeholder='Enter Book Name' onChange={handleChange} required={true}/>
          </div>
          <div className='form-group col-4'>
            <label htmlFor='availableCopies'>Available Copies</label>
            <input type='number' name='availableCopies' className='form-control mt-1' id='availableCopies'
                   placeholder='Available Copies' onChange={handleChange} required={true}/>
          </div>
          <div className='form-group col-4'>
            <label htmlFor='authors'>Author</label>
            <select name='authorId' required={true} className='form-control mt-1' id='authors' onChange={handleChange}
                    defaultValue={''}>
              <option value='' hidden>Select author</option>
              {props.authors.map(author => {
                return (
                  <option value={author.id}>{author.name} {author.surname}</option>
                );
              })}
            </select>
          </div>
          <div className='form-group col-4'>
            <label htmlFor='bookCategories'>Category</label>
            <select name='categoryType' required={true} className='form-control mt-1' id='bookCategories'
                    onChange={handleChange} defaultValue={''}>
              <option value='' hidden>Select author</option>
              {props.categories.map(category => {
                return (
                  <option value={category}>{category}</option>
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

export default BookCreate;