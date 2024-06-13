import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthToken, setUserRole } from "./redux/authSlice";
import { useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const role = sessionStorage.getItem("userRole");
    if (token) {
      dispatch(setAuthToken(token));
      dispatch(setUserRole(role)); // Dispatch the user role to redux store
      navigateToRolePage(role); // Navigate based on the user role
    }
  }, [dispatch]);

  const navigateToRolePage = (role) => {
    if (role === "admin") {
      navigate("/Admin");
    } else if (role === "owner") {
      navigate("/owner");
    } else {
      navigate("/");
    }
  };

  return <Home />;
}

export default App;
