import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-primary text-primary-content shadow-lg">
      <div className="flex-1 px-4 lg:px-8">
        <NavLink to="/" className="btn btn-ghost text-2xl font-bold">
          BDIS
        </NavLink>
      </div>

      <div className="flex-none px-4 lg:px-8">
        <ul className="menu menu-horizontal space-x-2">
          {[
            { to: '/', label: 'Home' },
            { to: '/scanner', label: 'Scanner' },
            { to: '/kanban', label: 'Kanban' },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-secondary text-secondary-content'
                      : 'hover:bg-secondary/20'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
