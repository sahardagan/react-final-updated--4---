import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IUserForm, JwtPayload, UserProfileType } from "../interfaces/users";
import { jwtDecode } from "jwt-decode";

export interface UserContextType {
  user: JwtPayload | null;
  setUser: React.Dispatch<React.SetStateAction<JwtPayload | null>>;
  signup: (userData: IUserForm) => Promise<void>;
  login: (userData: ILoginForm) => Promise<void>;
  logout: () => void;
  fetchUserProfile: (userId: string) => Promise<UserProfileType | null>; // עדכון סוג הפונקציה
  updateUserProfile: (
    userId: string,
    updatedProfile: UserProfileType
  ) => Promise<void>;
  profile: UserProfileType | null;
}

interface ILoginForm {
  email: string;
  password: string;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwtDecode(token);
    setUser(decoded as JwtPayload); // תואם ל-JwtPayload
  }, []);

  const signup = async (userData: IUserForm) => {
    try {
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        userData
      );
      navigate("/signin");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const login = async (userData: ILoginForm) => {
    try {
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        userData
      );
      localStorage.setItem("token", JSON.stringify(response.data));
      const decoded = jwtDecode(response.data);
      setUser(decoded as JwtPayload);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchUserProfile = async (
    userId: string
  ): Promise<UserProfileType | null> => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
        {
          headers: {
            "X-Auth-Token": token ? JSON.parse(token) : null,
          },
        }
      );
      return response.data as UserProfileType;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const updateUserProfile = async (
    userId: string,
    updatedProfile: UserProfileType
  ): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
        updatedProfile,
        {
          headers: {
            "X-Auth-Token": token ? JSON.parse(token) : null,
          },
        }
      );
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        signup,
        login,
        logout,
        fetchUserProfile,
        updateUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
