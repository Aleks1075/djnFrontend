import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      <Link to="/contact" className="font-bold hover:text-yellow-500">
        Kontakt
      </Link>
      {isAuthenticated ? (
        <>
          <Link
            to="/registration-status"
            className="font-bold hover:text-yellow-500"
          >
            Tilmeldte aktiviteter
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-yellow-500 hover:bg-white"
          onClick={async () => await loginWithRedirect()}
        >
          Log ind
        </Button>
      )}
    </span>
  );
};

export default MainNav;
