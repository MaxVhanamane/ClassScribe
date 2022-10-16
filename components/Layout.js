// import Footer from "./Footer"
// import Navbar from "./Navbar"
// import {useContext,useEffect} from "react";
// import {useRouter} from "next/router"
// export default function Layout({children}) {
//   const router= useRouter()

//   useEffect(()=>{
//     let token = localStorage.getItem("token");
//     const data = {token};


//     async function verify(){

//     const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/verifyauthexptime`, {
//       method: 'POST', // or 'PUT'
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//     const response = await res.json()
//   if(!response.success){
//   clearCart()
//   removeToken();
//   localStorage.removeItem("user")

//   localStorage.removeItem("role")

//    alert("Token expired : \n please login again to refresh your token.")
//   }
 


// }

//     if(token){
//       verify()
    
//     }
   
   
//   },[router.query])
//     return (
//       <div className='h-screen'>
//    <Navbar />
//         {children}
//         <Footer/>
//       </div>
//     )
//   }
  