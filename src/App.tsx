import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Products from "./screens/Products";
import { RequireAuth } from "./components/RequireAuth";
import FormikLogin from "./screens/FormikLogin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/products"
          element={
            <RequireAuth>
              <Products />
            </RequireAuth>
          }
        />
        <Route path="/f-login" element={<FormikLogin />} />
      </Routes>
    </>
  );
}

export default App;
