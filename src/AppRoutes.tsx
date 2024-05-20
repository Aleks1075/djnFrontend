import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/layout';
import HomePage from './pages/HomePage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './auth/ProtectedRoute';
import ManageEventPage from './pages/ManageEventPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout showHero><HomePage/></Layout>} />
            <Route path="/auth-callback" element={<AuthCallbackPage/>} />
            <Route element={<ProtectedRoute />}>
            <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
            <Route path="/manage-event" element={<Layout><ManageEventPage /></Layout>} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;