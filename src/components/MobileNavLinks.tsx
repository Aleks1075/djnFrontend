import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <>
      <Link
        to="/registration-status"
        className="flex bg-white items-center font-bold hover:text-yellow-500"
      >
        Tilmeldte aktiviteter
      </Link>
      <Link
        to="/manage-event"
        className="flex bg-white items-center font-bold hover:text-yellow-500"
      >
        Administrer begivenheder
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-yellow-500"
      >
        Profil
      </Link>
      <Link
        to="/contact"
        className="flex bg-white items-center font-bold hover:text-yellow-500"
      >
        Kontakt
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log ud
      </Button>
    </>
  );
};

export default MobileNavLinks;
