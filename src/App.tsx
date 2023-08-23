import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import { SignIn } from "./screens/SignIn";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
