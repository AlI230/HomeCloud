import '../index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Redirect } from 'react-router-dom'

function Register() {

  const [ isLoggedIn, setLoggedIn ] = useState(false);
  const [ isError, setIsError ] = useState(false); 
  const [ emailUser, setEmail ] = useState(""); 
  const [ password, setPassword ] = useState("");
  const [ firstname, setFirstname ] = useState("");
  const [ lastname, setLastname ] = useState("");
  const { setAuthTokens } = useAuth();

  function postRegister() {
    console.log('logging in');
    axios({method: "POST", url:`http://${process.env.REACT_APP_HOST_IP}:3030/register`, data: {
      email: emailUser,
      password: password,
      firstname: firstname,
      lastname: lastname
    }}).then(result => {
      if(result.status === 200) {
        console.log(result.data);
        setAuthTokens({
          email: result.data.email,
          id: result.data.id,
          profile_pic: result.data.profile_pic,
          name: result.data.name,
        });
        setLoggedIn(true)
      } else {
        setIsError(true)
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if(isLoggedIn) {
    return <Redirect to="/" />
  }

    return (
        <div class="fixed z-10 inset-0 overflow-y-auto shadow-2xl bg-gray-100">
          {/* <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <form>
              <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="w-full bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="min-w-0 sm:flex sm:items-start">
                    <div class="w-full mt-3 text-center sm:mt-0 sm:ml-1 sm:text-left">
                      <h3 class="text-2xl leading-1 font-medium text-blue-500" id="modal-headline">
                        Register
                      </h3>
                      <div class="w-full mt-4 flex flex-col space-y-4">
                      { isError &&<p>The email is already taken or required everything!</p> }
                        <input type="text" value={firstname} onChange={ (e) => setFirstname(e.target.value) } placeholder="Firstname..." class="h-8 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-blue-500 rounded-md"/>
                        <input type="text" value={lastname} onChange={ (e) => setLastname(e.target.value) } placeholder="Lastname..." class="h-8 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-blue-500 rounded-md"/>
                        <input type="text" value={emailUser} onChange={ (e) => setEmail(e.target.value) } placeholder="Email..." class="h-8 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-blue-500 rounded-md"/>
                        <input type="password" value={password} onChange={ (e) => setPassword(e.target.value) } placeholder="Password..." class="h-8 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-blue-500 rounded-md"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <a>
                  <button type="button" onClick={postRegister} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Register
                  </button>
                  </a>
                </div>
              </div>
            </form>
          </div> */}

          <div className="flex items-center justify-center h-screen w-screen min-h-screen pt-4 px-4 pb-20 text-center">
              <form className="space-y-5 text-center lg:w-1/4 w-80">
                  <div className="flex flex-col items-center space-y-4">
                    <svg class="w-20 h-20 text-cornblue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
                    <h1 className="text-cornblue-400 text-3xl font-bold">HomeCloud</h1>
                    <h2 className="text-xl font-bold text-gray-800">Create your account now!</h2>
                  </div>
                  { isError &&<p>The email is already taken or required everything!</p> }
                  <div className="w-full mt-6 flex flex-col space-y-0">
                    <input type="text" value={firstname} onChange={ (e) => setFirstname(e.target.value) } placeholder="Firstname..." class="h-8 p-2 block w-full text-md border border-gray-500 rounded-t-md focus:outline-none"/>
                    <input type="text" value={lastname} onChange={ (e) => setLastname(e.target.value) } placeholder="Lastname..." class="h-8 p-2 block w-full text-md border-l border-r border-b border-gray-500 focus:outline-none"/>
                    <input type="text" value={emailUser} onChange={ (e) => setEmail(e.target.value) } placeholder="Email..." class="h-8 p-2 block w-full text-md border-l border-r border-gray-500 focus:outline-none"/>
                    <input type="password" value={password} onChange={ (e) => setPassword(e.target.value) } placeholder="Password..." class="h-8 p-2 block w-full text-md border border-gray-500 rounded-b-md focus:outline-none"/>
                  </div>
                  <div className="mt-6 flex flex-col space-y-4">
                  <div className="flex xl:flex-row flex-col items-start justify-between">
                    <label class="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox border border-gray-200 h-5 w-5 text-cornblue-400 rounded-sm" /><span class="ml-2 text-gray-700">Remember me</span>
                    </label>
                    <a href="/login" className="text-cornblue-400 font-medium xl:mt-0 mt-2">Back to login</a>
                  </div>
                  <div className="w-full flex flex-col space-y-2">
                    <button type="button" onClick={postRegister} className="w-full inline-flex justify-center rounded-lg shadow-sm py-2 bg-cornblue-400 text-cornblue-200 font-medium hover:bg-cornblue-600 focus:outline-none sm:w-auto text-md">
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
          </div>
        </div>
    )
}

export default Register;
