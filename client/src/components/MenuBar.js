// import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import { Menu  } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';

import { AuthContext } from '../context/auth';

function MenuBar() {
  const {user, logout} = useContext(AuthContext);

  const menuBar = user ? (
      <Menu pointing secondary size='massive' color='teal'>
        <Menu.Item name={user.username} as={NavLink} to='/' exact />
        
        <Menu.Menu position='right'>
          <Menu.Item name='logout' onClick={logout} />
        </Menu.Menu>
      </Menu>
  ) : (
      <Menu pointing secondary size='massive' color='teal'>
        <Menu.Item name='home' as={NavLink} to='/' exact />
        
        <Menu.Menu position='right'>
          <Menu.Item name='login' as={NavLink} to='/login' exact />
          <Menu.Item name='register' as={NavLink} to='/register' exact />
        </Menu.Menu>
      </Menu>
  );
  
  return menuBar;
}

export default MenuBar;


// function MenuBar(){
//   const pathname = window.location.pathname;
  
//   const path = pathname === '/' ? 'home' : pathname.substr(1);
//   const [activeItem, setActiveItem] = useState(path);

//   const handleItemClick = (e, { name }) => setActiveItem(name);

//     return (
//         <Menu pointing secondary size="massive" color="teal">
//           <Menu.Item
//             name='home'
//             active={activeItem === 'home'}
//             onClick={handleItemClick}
//             as={Link}
//             to="/"
//           />
//           <Menu.Menu position='right'>
//           <Menu.Item
//             name='login'
//             active={activeItem === 'login'}
//             onClick={handleItemClick}
//             as={Link}
//             to="/Login"
//           />
//             <Menu.Item
//               name='register'
//               active={activeItem === 'register'}
//               onClick={handleItemClick}
//               as={Link}
//             to="/Register"
//             />
//           </Menu.Menu>
//         </Menu>
//     )
// }

// export default MenuBar;