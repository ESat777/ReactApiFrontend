import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../Admin/AuthContext";
import "../components.css";

const Header = () => {
  const auth = useContext(AuthContext);
  return (
    <header className="navbar-dark bg-primary hs">
      <div className="container d-flex justify-content-between">
        <Link to="/" className="navbar-brand text-light nav-link">
          <span className="fs-1 fw-bolder lh-lg text-xl">EdiTour</span>
        </Link>

        <ul className="nav nav-pills">
          <li className="nav-item fs-5">
            <Link to="/" className="nav-link text-light">
              Home
            </Link>
          </li>
          {auth.isLoggedin() ? (
            <li className="nav-item fs-5">
              <Link to="/countries" className="nav-link text-light">
                Country
              </Link>
            </li>
          ) : (
            ""
          )}
          {auth.isLoggedin() ? (
            <li className="nav-item fs-5">
              <Link to="/hotels" className="nav-link text-light">
                Hotels
              </Link>
            </li>
          ) : (
            ""
          )}
          {auth.isLoggedin() ? (
            <li className="nav-item fs-5">
              <Link to="/customers" className="nav-link text-light">
                Customers
              </Link>
            </li>
          ) : (
            ""
          )}
          {auth.isLoggedin() ? (
            <ul className="navbar-nav ">
              <li className="nav-itemclass">
                <Link
                  onClick={() => auth.logout()}
                  className="nav-link text-light fs-5"
                >
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link mx-4">{`🙋‍♂️ ${
                  auth.getUser().name
                }`}</span>
              </li>
            </ul>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link text-light fs-5">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link text-light fs-5">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
