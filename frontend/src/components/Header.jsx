import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userFirstLetter = user?.fullName?.charAt(0);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid px-lg-5">
          <a className="navbar-brand text-white" href="/">
            Dashboard
          </a>
          <div className="ml-auto dropdown-hover">
            <span
              className="bg-white rounded-circle px-3 py-2 text-primary fw-semibold"
              style={{ cursor: "pointer" }}
            >
              {userFirstLetter}
            </span>
            <div className="dropdown-menu dropdown-menu-right">
              <button
                className="dropdown-item"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
