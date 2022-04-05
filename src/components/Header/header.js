import {Link} from 'react-router-dom';

const Header = () => {

  return (
    <header className='d-flex justify-content-center py-3'>
      <ul className='nav nav-pills'>
        <li className='nav-item'><Link to={'/books'} className='nav-link'>Books</Link></li>
        <li className='nav-item'><Link to={'/categories'} className='nav-link'>Categories</Link></li>
      </ul>
    </header>
  );
};

export default Header;