import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from "next/link"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Forgotpassword() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [cNewpassword, setCNewPassword] = useState("")


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/")
    }
  }, [])




  const handleChange = (e) => {

    if (e.target.name === "email") {
      setEmail(e.target.value)
    }
    else if (e.target.name === "password") {
      setNewPassword(e.target.value)

    }
    else if (e.target.name === "cpassword") {
      setCNewPassword(e.target.value)

    }
  }



  const handleSendMail = async () => {
    // basic email verification
    const terms = ["@"]
    const result = terms.every(term => email.includes(term))

    if (result && email.length > 3) {


      const data = { email, sendMail: true };

      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgotpassword`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const response = await res.json()

      if (response.success) {
        toast.success("We have emailed you password reset link. Check your mail.", {

          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      else {
        toast.error("No user found! Please enter a valid mail id.", {

          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }

    }

    else {

      toast.error("Enter a valid mail id", {

        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }



  }


  const handleResetPassword = async () => {
    // Check if the password and confirm password matches
    if (newPassword === cNewpassword) {
      if(newPassword.length>7 && cNewpassword.length>7){

      

      const data = { email: router.query.email, sendMail: false, token: router.query.token, newPassword: newPassword };

      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgotpassword`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const response = await res.json()

      if (response.success) {
        toast.success("Your password has been Changed successfully.", {

          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/login")
      }

      else {
        toast.error(response.message, {

          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/forgotpassword")

      }

    }
    
    else {
      toast.error("Password must be at least 8 characters long", {

        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }


    else {
      toast.error("New password and confirm new password must be same.", {

        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }




  return (
    <section className="h-screen">
      <div className=" py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-6/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="flex justify-center items-center g-0">
                <div className=" px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center rounded-full">

                      <h4 className="text-2xl font-bold mt-1 mb-5 pb-1">Forgot Password</h4>

                    </div>
                    {/* If user has a token in his url it means he is visiting this page using the link that we sent him in a mail.
                    So we will show him password reset page. If he does not have a token in his url then will let him generate 
                    password reset link. */}
                    {router.query.token && <div>


                      <div className="mb-4">
                        <input
                          onChange={handleChange}
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="password"
                          placeholder="New password"
                          name="password"
                          value={newPassword}
                        />
                      </div>
                      <div className="mb-4">

                        <input
                          onChange={handleChange}
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="cpassword"
                          placeholder="Confirm new password"
                          name="cpassword"
                          value={cNewpassword}

                        />
                      </div>

                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          onClick={handleResetPassword}

                          className="  inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight  rounded shadow-md   active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-violet-800 hover:bg-violet-900"

                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          type="submit"

                        >
                          Change Password
                        </button>
                      </div>
                    </div>}



                    {!router.query.token && <div>
                      {/* <p className="mb-4">Please login to your account</p> */}
                      <div className="mb-4">
                        <input
                          onChange={handleChange}
                          type="email"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="email"
                          placeholder="Email"
                          name="email"
                          value={email}

                        />
                      </div>

                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          onClick={handleSendMail}
                          className="  inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight  rounded shadow-md   active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-violet-800 hover:bg-violet-900"

                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          type="submit"

                        >
                          Send Password Reset Link
                        </button>
                      </div>
                  
                    </div>}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
