import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import app from "../../Hook/firebaseConfig";
import useFirebase from "../../Hook/useFirebase";
import { UserContext } from "../Layout/Main";
import ResetPassword from "../ResetPassword/ResetPassword";

const Login = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const auth = getAuth(app);

  const [modalShow, setModalShow] = useState(false);
  const [user,setUser]=useContext(UserContext)
  const navigate=useNavigate();
  const {signInGoogle}=useFirebase()

  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }

  const handlePassword=(e)=>{
    setPassword(e.target.value)
  }

  const handleLogin=()=>{
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const currentUser = userCredential.user;
        console.log(currentUser)
        setUser(currentUser)
        Swal.fire({
          icon: 'success',
          title: 'Login',
          text: 'User Login Successfulluy',
        })
        setError('')
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage)
      });
  }

  return (
    <div className="mt-5">
      <div className="main-container d-flex container justify-content-between align-items-center">
        <div className="register-image image-fluid w-100  ">
          <img
            className="w-100 img-fluid image-fluid"
            src="https://i.ibb.co/0hLvWvP/undraw-Login-re-4vu2.png"
            alt=""
          />
        </div>
        <div className="register-form  w-100">
          <p>{error}</p>
          <div className="input-box">
            <input
              onBlur={handleEmail}
              className="form-control p-3 m-2"
              type="email"
              placeholder="Email"
            />
            <input
              onBlur={handlePassword}
              className="form-control p-3 m-2"
              type="password"
              placeholder="password"
            />
            <p className="link ">
              <Link to="/registration" className="text-decoration-none">
                <small className="text-danger link">
                  are you new? please register
                </small>
              </Link>
              <span role="button" className="ms-4 text-primary cursor-pointer" onClick={() => setModalShow(true)}>
                Forget Password?
              </span>
            </p>
            <input className="p-2" type="checkbox" />{" "}
            <span className="mb-3 ">remember me </span>
            <br />
            <button onClick={handleLogin} className="btn btn-info p-3 w-50 mt-3 fw-bold text-white">
              Login
            </button>
          </div>
          <button
          onClick={signInGoogle} className="btn mt-3 border d-flex align-items-center justify-content-evenly p-2 m-auto">
            <img
              className="w-25 image-fluid btn-image"
              src="https://img.icons8.com/color/344/google-logo.png"
              alt=""
            />
            <p className="fw-bold">Google SignIn</p>
          </button>
        </div>
        <ResetPassword show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  );
};

export default Login;
