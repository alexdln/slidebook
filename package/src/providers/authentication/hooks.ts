import { useContext } from "react";

import { AuthenticationContext, AuthorizeContext } from "./context";

export const useAuthentication = () => {
    return useContext(AuthenticationContext);
};

export const useAuthorize = () => {
    return useContext(AuthorizeContext);
};
