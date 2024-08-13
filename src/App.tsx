import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AddPostPg from './pages/AddPost';
import AddPostPage from "./pages/EditPost.tsx";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<PrivateRoute element={<Home />} />} />
                    <Route path="/edit-post/:id" element={<PrivateRoute element={<AddPostPage />} />} />
                    <Route path="/create-post" element={<PrivateRoute element={<AddPostPg />} />} />
                    <Route path="/login" element={<PublicRoute element={<SignIn />} />} />
                    <Route path="/register" element={<PublicRoute element={<Register />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
