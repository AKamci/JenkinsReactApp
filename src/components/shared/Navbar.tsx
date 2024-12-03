import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SidebarComponent from '../settings/SettingsSideBar';
import { faCog } from '@fortawesome/free-solid-svg-icons';



const Navbar: React.FC = () => {
  const [visibleSidebar, setVisibleSidebar] = useState<boolean>(false);

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
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarScroll'>
          <form className='d-flex' role='search'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Ara'
              aria-label='Search'
            />
            <button className='btn btn-outline-success' type='submit'>
              Ara
            </button>
          </form>
          <FontAwesomeIcon
            icon={faCog}
            className='settings-icon'
            onClick={() => setVisibleSidebar(true)}
          />
        </div>
      </div>
      <SidebarComponent 
        visible={visibleSidebar} 
        onHide={() => setVisibleSidebar(false)} 
      />
    </nav>
  );
};

export default React.memo(Navbar);