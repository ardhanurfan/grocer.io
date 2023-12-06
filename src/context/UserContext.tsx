import { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toastError } from "../components/Toast";

export type UserTypeContext = {
  user: User | null;
};

const defaultValue = {
  user: {
    id: "",
    fullname: "",
    email: "",
    password: "",
    subscription: "",
  },
};

export const UserContext = createContext<UserTypeContext>(defaultValue);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (user: User) => {
    setUser(user);
  };

  const token = Cookies.get("token_vshoes");
  const getUser = async () => {
    if (token) {
      //   try {
      //     const response = await getWithAuth(token, "users/me");
      //     const data = response.data?.data;
      //     updateUser(data);
      //   } catch (error) {
      //     toastError("Get User Failed");
      //   }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
