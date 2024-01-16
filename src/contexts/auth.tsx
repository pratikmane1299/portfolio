"use client";

import React, { useContext } from "react";

type AuthStateType = {
  loggedIn: boolean;
};

type AuthContextType = {
  authState: AuthStateType;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStateType>>;
};

const AuthContext = React.createContext<AuthContextType>({
  authState: {loggedIn: false},
  setAuthState: () => {},
});

export default function AuthProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [authState, setAuthState] = React.useState({ loggedIn: false });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
