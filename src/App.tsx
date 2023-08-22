import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import NavBar from "./components/NavBar";
import { Crud_api } from "./screens/Crud_api";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crud-api" element={<Crud_api />} />
      </Routes>
    </>
  );
}

export default App;
