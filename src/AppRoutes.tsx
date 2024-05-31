import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageEventPage from "./pages/ManageEventPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import RegistrationStatusPage from "./pages/RegistrationStatusPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOfUsers from "./pages/AdminOfUsers";
import Gallery from "./pages/Gallery";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:eventId"
        element={
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <ContactPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/registration-status"
          element={
            <Layout>
              <RegistrationStatusPage />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/manage-event"
          element={
            <Layout>
              <ManageEventPage />
            </Layout>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
        <Route
          path="/admin-users"
          element={
            <Layout>
              <AdminOfUsers />
            </Layout>
          }
        />
        <Route
          path="/gallery"
          element={
            <Layout>
              <Gallery />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
