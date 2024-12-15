import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SinglePostPage from "./pages/SinglePostPage";
import UserPostPage from "./pages/UserPostPage";
import CreatePostPage from "./pages/CreatePostPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import Menu from "./components/Menu";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<Menu />} />
          <Route path="/:id" element={<SinglePostPage />} />
          <Route path="/posts/:id" element={<UserPostPage />} />
          <Route path="/create/:id" element={<CreatePostPage />} />
          <Route path="/update/:id" element={<UpdatePostPage />} />
        </Routes>
      </div>

      <footer></footer>
    </BrowserRouter>
  );
}

export default App;
