import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError , message , isSuccess } = useSelector((state)=>state.auth)

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }

        dispatch(login(userData))


  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Sign In
        </h1>
        <p>Please Login To Get Support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your Password"
              required
            />
          </div>
          <div className="form-group">
            <button type='submit' className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}


export default Login