import { getAuth, signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import app from "../../Hook/firebaseConfig";
import { UserContext } from "../Layout/Main";
import "./Header.css";

const Header = () => {
  const [user,setUser]=useContext(UserContext)
  const auth = getAuth(app);

  const logOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      Swal.fire({
        icon: 'success',
        title: 'Logout',
        text: 'User Log out Successfulluy',
      })
      setUser('')
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div>
      <nav className="d-flex justify-content-around align-items-center bg-secondary p-3 flex-wrap">
        <div className="logo ">
          <img
            className="logo-img"
            src="https://i.ibb.co/TtRpKPP/doctor.png"
            alt=""
          />
        </div>
        <div className="menu-container d-flex flex-wrap ">
          <Link to="/home" className="text-decoration-none">
            <li className="nav-link items  ms-3 text-info fw-bolder">Home</li>
          </Link>
       { !user?.email?  <Link to="/login" className="text-decoration-none">
            <li className="nav-link items  ms-3 text-info fw-bolder">Login</li>
          </Link>
          :
          <li
            onClick={logOut}
            role="button"
            className="nav-link items  ms-3 text-info fw-bolder"
          >
            Logout
          </li>}

          <Link to="/registration" className="text-decoration-none">
            <li className="nav-link items  ms-3 text-info fw-bolder">
              Registration
            </li>
          </Link>

          <Link to="/about" className="text-decoration-none">
            <li className="nav-link items  ms-3 text-info fw-bolder">About</li>
          </Link>
          <li className="nav-link items  ms-3 text-info fw-bolder">
            {user?.displayName}
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Header;
