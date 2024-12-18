import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SinglePostPage from "./pages/SinglePostPage";
import UserPostPage from "./pages/UserPostPage";
import CreatePostPage from "./pages/CreatePostPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <main className="flex flex-col">
        <Navbar />

        <div>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/" element={<Menu />} />
              <Route path="/:id" element={<SinglePostPage />} />
              <Route path="/posts/:id" element={<UserPostPage />} />
              <Route path="/create/:id" element={<CreatePostPage />} />
              <Route path="/update/:id" element={<UpdatePostPage />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
