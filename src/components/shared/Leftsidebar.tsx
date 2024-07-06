import { Link, NavLink, useLocation } from "react-router-dom";
import { INavLink } from "../../types";
import { sidebarLinks } from "../../constants";

const LeftSidebar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        
        <Link to="/">
          <h1 className="font-cursive px-4">Justin and Lindsey 2024!</h1>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive && "bg-dark"}`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`md:h-10 md:w-10 max-w-full group-hover:invert ${isActive && "invert"}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default LeftSidebar;
