import { useContext, useEffect } from "react";
import { useRouter } from "next/router"
import { AuthContext } from './../context/AuthState';

export default function Layout({ children }) {

  const router = useRouter()
  const { removeToken, setLoading } = useContext(AuthContext);

  useEffect(() => {

    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    if (!token && !role && router.pathname != "/login" && router.pathname != "/forgotpassword") {
      router.push("/login")
    }

    async function verify() {
      setLoading(true)
      const serverResponse = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/verifyauthexptime`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })


      const response = await serverResponse.json()

      if (!response.success) {
        removeToken();
        router.push("/login")
        alert("Token expired : \n please login again to refresh your token.")
      }

      setLoading(false)

    }

    if (token) {
      verify()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  return (
    <div className="h-screen relative">
      {children}
    </div>
  )
}
