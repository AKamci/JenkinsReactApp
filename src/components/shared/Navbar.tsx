import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  console.log('Navbar is rendered.');

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <NavLink to='/' className={'nav-link'} />
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarScroll'
          aria-controls='navbarScroll'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarScroll'>
          <ul className='navbar-nav my-lg-0 navbar-nav-scroll'>
            <li className='nav-item'>
              <NavLink
                to='/'
                className={({ isActive }) => 
                  isActive ? 'nav-link active-link' : 'nav-link'
                }>
                 Anasayfa
              </NavLink>
            </li>
          </ul>
          <form className='d-flex' role='search'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Ara'
              aria-label='Search'
            />
            <button className='btn btn-outline-success' type='submit'>Ara</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);