import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import { input, Spinner } from "@nextui-org/react";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) => {
  supabase.auth.signInWithPassword({ email, password });
};
const logout = () => supabase.auth.signOut();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [auth, setAuth] = useState(false);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;

      setUser(currentUser ?? null);
      setAuth(currentUser ? true : false);

      if (currentUser) {
        getDataUSer(currentUser.id);
      } else {
        console.log("ambatukam, tidak ada usernya :( ");
        setLoading(false);
      }
    };

    getUser();

    const getDataUSer = async (userId) => {
      try {
        const { data: userData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId);

        setUsername(userData[0].username);
        setRole(userData[0].role);
        setEmail(userData[0].email);
        setAvatar(userData[0].avatar_url);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuth(false);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);
  return [
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        role,
        username,
        auth,
        loading,
        email,
        avatar,
      }}
    >
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner className="m-auto" label="Tapi tunggu dulu" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>,
  ];
};

export default AuthProvider;
