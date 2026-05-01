import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/argentBankLogo.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";


function Header() {

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || user) {
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        const data = await response.json();

        if (!response.ok) {
          return
        }

        dispatch(setUser(data.body));
      } catch {
        return;
      }
    }
    fetchProfile();
  }, [token, user, dispatch]);

  const handleSignout = () => {
    dispatch(logout());
    navigate("/signin");
  }

  if (!token) {

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <NavLink className="main-nav-item" to="/signin">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      </div>
    </nav>
  )

  } 
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <NavLink className="main-nav-item" to="/profile">
          <i className="fa fa-user-circle"></i>
          {user ? `${user.userName}`: ""}
        </NavLink>
        <NavLink onClick={handleSignout} className="main-nav-item" to="/signin">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </NavLink>
      </div>
    </nav>
  )
}

export default Header
