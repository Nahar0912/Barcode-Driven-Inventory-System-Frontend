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
    <div className="navbar bg-white shadow-md px-6 py-3 sticky top-0 z-50">
      {/* Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
            {menuItems.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? 'text-primary font-semibold' : 'hover:bg-gray-100 px-2 py-1 rounded'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost font-extrabold text-3xl text-primary tracking-wide">
          BDIS
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-4">
          {menuItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive ? 'bg-primary text-white' : 'hover:bg-gray-200'
                  }`
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
            className="btn bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="btn bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
