import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Blog from "./pages/Blog";
import Landing from "./pages/Landing";

function App() {
  return (
    <div className="font-ubunutSansMono">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Landing />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
