import React, { createContext, useContext, useEffect, useState } from "react";
import LoadingHome from "../Components/LoadingHome";
import api from "../api";

const newContext = createContext();

const UserContext = ({ children }) => {
  const [User, setUser] = useState({});
  const [isAuthorized, setisAuthorized] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/user/me")
      .then((res) => {
        setisAuthorized(true);
        setUser(res.data.User)
      })
      .catch((err) => {
        setisAuthorized(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isAuthorized]);

  
  if (Loading) {
    return <LoadingHome />;
  }

  return (
    <newContext.Provider
      value={{ isAuthorized, setisAuthorized, User, setUser }}
    >
      {children}
    </newContext.Provider>
  );
};

export default UserContext;

export const useData = () => {
  return useContext(newContext);
};
