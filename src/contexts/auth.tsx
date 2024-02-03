"use client";

import React, { useContext } from "react";

type User = {
  id: number;
  username: string;
}

type AuthStateType = {
  loggedIn: boolean;
  user: User | null;
};

type AuthContextType = {
  authState: AuthStateType;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStateType>>;
};

const AuthContext = React.createContext<AuthContextType>({
  authState: {loggedIn: false, user: null},
  setAuthState: () => {},
});

export default function AuthProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [authState, setAuthState] = React.useState<AuthStateType>({
    loggedIn: false,
    user: null,
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
