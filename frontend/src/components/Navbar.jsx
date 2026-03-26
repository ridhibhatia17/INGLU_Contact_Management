import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Users, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <Users size={24} color="#6366f1" />
        INGLU Contacts
      </Link>
      
      <div className="navbar-nav">
        {user ? (
          <>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Welcome, {user.name}
            </span>
            <button className="btn btn-outline" onClick={handleLogout}>
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">
              <LogIn size={18} />
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              <UserPlus size={18} />
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
