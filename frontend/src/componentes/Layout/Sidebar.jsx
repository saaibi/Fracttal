import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // Changed import path

const Sidebar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside style={{ width: '200px', padding: '20px', backgroundColor: '#f0f0f0', borderRight: '1px solid #ccc' }}>
      <nav>
        <ul>
          <li><Link to="/">Tasks</Link></li>
          <li><Link to="/categorias">Categories</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;