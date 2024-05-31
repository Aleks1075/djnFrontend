import { useCreateMyUser, useGetMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const { currentUser, isLoading, isError } = useGetMyUser();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    const handleUserCreation = async () => {
      if (user?.sub && user?.email && !hasCreatedUser.current) {
        await createUser({ auth0Id: user.sub, email: user.email });
        hasCreatedUser.current = true;
      }
    };

    handleUserCreation();
  }, [createUser, user]);

  useEffect(() => {
    if (!isLoading && !isError && currentUser) {
      if (currentUser.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isLoading, isError, currentUser, navigate]);

  return <>Indlæser...</>;
};

export default AuthCallbackPage;
