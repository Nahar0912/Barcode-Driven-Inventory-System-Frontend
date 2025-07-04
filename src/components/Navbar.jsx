import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { to: '/', label: 'Scanner' },
    { to: '/kanban', label: 'Kanban' },
    { to: '/analytics', label: 'Analytics' },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 py-2">
      {/* Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {menuItems.map(item => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => isActive ? 'text-primary' : ''}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost font-bold text-3xl text-primary">
          BDIS
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-200'}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Button */}
      <div className="navbar-end">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="btn btn-error text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="btn btn-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
