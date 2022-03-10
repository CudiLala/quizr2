import React, { useEffect, useReducer, useState } from "react";
import Cookies from "js-cookie";
import { getFetcher } from "utils/fetchers";
import useLoader from "hooks/loader";
import { useRouter } from "next/router";

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

//global contexts
export const UserContext = React.createContext<UserState>(null);
export const SetLoginContext = React.createContext<
  React.Dispatch<React.SetStateAction<{ value: boolean }>>
>(() => {});
export const LoaderContext = React.createContext<[() => void, () => void]>([
  () => {},
  () => {},
]);

function userReducer(state: UserState, action: UserAction) {
  if (action.type === "nullify") return null;
  else if (action.type === "setPending") return "pending";
  else if (action.type === "setUser") return action.payLoad;
  return null;
}

const AppWrapper: React.FC = ({ children }) => {
  //the essense of the login state is to trigger a rerender and refetch of user when changed (ex. during signOut and signIn)
  const [login, setLogin] = useState<{ value: boolean }>({
    value: !!Cookies.get("login"),
  });
  const [user, userDispatch] = useReducer(userReducer, getUserFromStore());
  //loader
  const [Loader, runLoader, removeLoader] = useLoader();
  //router
  const router = useRouter();

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

  useEffect(() => {
    router.events.on("routeChangeStart", runLoader);
    router.events.on("routeChangeComplete", removeLoader);
    router.events.on("routeChangeError", removeLoader);

    return () => {
      router.events.off("routeChangeStart", runLoader);
      router.events.off("routeChangeComplete", removeLoader);
      router.events.off("routeChangeError", removeLoader);
    };
  });

  return (
    <div id="body">
      <UserContext.Provider value={user}>
        <SetLoginContext.Provider value={setLogin}>
          <Loader />
          <LoaderContext.Provider value={[runLoader, removeLoader]}>
            {children}
          </LoaderContext.Provider>
        </SetLoginContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default AppWrapper;
