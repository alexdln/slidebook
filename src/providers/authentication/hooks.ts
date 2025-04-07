import { useContext } from "react";

import { AuthenticationContext, SetAuthenticationContext } from "./context";

export const useAuthentication = () => {
    return useContext(AuthenticationContext);
};

export const useSetAuthentication = () => {
    return useContext(SetAuthenticationContext);
};
