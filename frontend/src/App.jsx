//src/App.jsx

import { HashRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Item from "./Item";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="item" element={<Item />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
