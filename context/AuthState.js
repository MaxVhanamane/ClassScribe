import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// creating context object and exporting it.
export const AuthContext = createContext();

function AuthState(props) {

  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let tokenValue = localStorage.getItem("token")
    let role = localStorage.getItem("role")
    if (tokenValue && role) {
      setToken(tokenValue)
      setRole(role)
    }
  }, [])


  const removeToken = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    setToken(null)
    setRole(null)
    router.push("/login")
    toast.success('Logged out successfully!', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <AuthContext.Provider
      value={{ token, role, removeToken, setRole, setToken }}
    >
      {/* Provider will give access to all the above states and functions to the components which are in props.children */}
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthState;
