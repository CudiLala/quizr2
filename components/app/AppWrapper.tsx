import React, { useEffect, useReducer, useState } from "react";
import Cookies from "js-cookie";
import { getFetcher } from "utils/fetchers";

type User = {
  username: string;
  profilePicture: string;
  id: string;
  isAdmin?: boolean;
};
type UserState = null | "pending" | User;
type UserAction =
  | { type: "nullify" }
  | { type: "setPending" }
  | { type: "setUser"; payLoad: User };

function userReducer(state: UserState, action: UserAction) {
  if (action.type === "nullify") return null;
  else if (action.type === "setPending") return "pending";
  else if (action.type === "setUser") return action.payLoad;
  return null;
}

export const UserContext = React.createContext<UserState>(null);
export const SetLoginContext = React.createContext<
  React.Dispatch<React.SetStateAction<{ value: boolean }>>
>(() => {});

const AppWrapper: React.FC = ({ children }) => {
  //the essense of the login state is to trigger a rerender and refetch of user when changed (ex. during signOut and signIn)
  const [login, setLogin] = useState<{ value: boolean }>({
    value: !!Cookies.get("login"),
  });
  const [user, userDispatch] = useReducer(userReducer, getUserFromStore());

  function getUserFromStore() {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user") ?? JSON.stringify({});
    if (!login.value) return null;
    if (JSON.parse(user).username) return JSON.parse(user);
    return "pending";
  }

  useEffect(() => {
    (async () => {
      const { data } = await getFetcher("/api/user");
      //sets user state to null if no success from fetching user data
      if (!data || !data.success) return userDispatch({ type: "nullify" });
      //reset localStorage
      localStorage.setItem("user", JSON.stringify({ ...data.user }));
      return userDispatch({
        type: "setUser",
        payLoad: { ...data.user },
      });
    })();
  }, [login]);

  return (
    <div id="body">
      <UserContext.Provider value={user}>
        <SetLoginContext.Provider value={setLogin}>
          {children}
        </SetLoginContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default AppWrapper;
