import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrFormNextLink } from "react-icons/gr";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { login, resetState } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const FORM_INITIAL_DATA = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(FORM_INITIAL_DATA);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message, {
        toastId: "success",
      });
      navigate("/");
    } else if (isError) {
      toast.error(message, {
        toastId: "error",
      });
    }
    dispatch(resetState());
  }, [dispatch, isSuccess, isError, message, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <div
        className="card shadow-lg border-0 w-100 my-3"
        style={{ maxWidth: "450px" }}
      >
        <div className="card-body">
          <h2 className="text-center fw-bold">Login</h2>
          <form className="px-md-5 px-sm-3 py-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control py-2"
                placeholder="john@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="mb-3 position-relative">
              {" "}
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-control py-2"
                placeholder="***********"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="password"
              />
              <span
                className="position-absolute"
                style={{ right: "10px", top: "50%" }}
                onClick={() => setShowPassword(!showPassword)}
                role="button"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </span>
            </div>

            <button className="btn btn-primary w-100 fw-semibold py-2 mb-3">
              Login
            </button>

            <Link
              to="/register"
              className="d-block text-center text-black text-decoration-none"
            >
              Create New Account
              <GrFormNextLink size={20} />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
