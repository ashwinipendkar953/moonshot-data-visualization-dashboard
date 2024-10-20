import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Home, Login, Register, NotFound } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Header from "./components/Header";

const Layout = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check if the user is authenticated
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
