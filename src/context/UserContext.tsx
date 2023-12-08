import { ReactNode, createContext, useEffect, useState } from "react";
import { toastError } from "../components/Toast";
import { supabase } from "../lib/api";

export type UserTypeContext = {
  user: User | null;
  setUser: (user: User) => void;
};

// const defaultValue = {
//   user: {
//     id: "",
//     fullname: "",
//     email: "",
//     password: "",
//     premium: false,
//   },
//   setUser:
// };

export const UserContext = createContext<UserTypeContext | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (user: User) => {
    setUser(user);
  };

  const getUser = async () => {
    // if (token) {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        updateUser({
          id: data.user.id,
          fullname: data.user.user_metadata?.fullname || "",
          email: data.user.email || "",
          password: "",
          premium: data.user.user_metadata?.premium || false,
        });
      }
    } catch (error) {
      toastError("Get User Failed");
    }
    // }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
