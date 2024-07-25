import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IUserForm, UserProfileType } from "../interfaces/users";
import { jwtDecode } from "jwt-decode";
import { ExtendedJwtPayload } from "../interfaces/ExtendedJwtPayload";

export interface UserContextType {
  user: ExtendedJwtPayload | null;
  setUser: React.Dispatch<React.SetStateAction<ExtendedJwtPayload | null>>;
  signup: (userData: IUserForm) => Promise<void>;
  login: (userData: ILoginForm) => Promise<boolean>;
  logout: () => void;
  fetchUserProfile: (userId: string) => Promise<UserProfileType | null>;
  updateUserProfile: (
    userId: string,
    updatedProfile: IUserForm
  ) => Promise<void>;
  profile: UserProfileType | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfileType | null>>;
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
  const [user, setUser] = useState<ExtendedJwtPayload | null>(null);
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwtDecode(token) as ExtendedJwtPayload;
    setUser(decoded);
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
      const decoded = jwtDecode(response.data) as ExtendedJwtPayload;
      setUser(decoded);
      navigate("/");
      return true;
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
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
    updatedProfile: IUserForm
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
        profile,
        setProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
