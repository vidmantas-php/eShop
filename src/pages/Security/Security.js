import { useContext } from "react";
import { UserContext } from "../../App";

export default ({ children, roles }) => {
  const { user, loggedIn } = useContext(UserContext);
  const authorized = roles
    ? user?.roles.some((r) => roles.includes(r))
    : loggedIn();

  return authorized ? children : "";
};
