import {useContext,useEffect} from "react";
import {useRouter} from "next/router"
import { AuthContext } from './../context/AuthState';
export default function Layout({children}) {
  const router= useRouter()
  const {
    removeToken
  } = useContext(AuthContext);

  useEffect(()=>{
    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    if(!token && !role && router.pathname!="/login"){
      router.push("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[router.query])
  useEffect(()=>{
    let token = localStorage.getItem("token");
    const data = {token};

    async function verify(){

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/verifyauthexptime`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const response = await res.json()

  if(!response.success){
  removeToken();
router.push("/login")

   alert("Token expired : \n please login again to refresh your token.")
  }
 


}

    if(token){
      verify()
    }


   
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[router.query])
    return (
      <div className="h-screen relative">

        {children}
       
      </div>
    )
  }
  