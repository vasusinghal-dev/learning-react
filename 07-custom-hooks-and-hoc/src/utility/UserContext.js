import { createContext } from "react";

const UserContext = createContext({ loggedUser: "Guest" });

export default UserContext;
