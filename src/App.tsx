import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import { SignIn } from "./screens/SignIn";
import { PageNotFound } from "./screens/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
