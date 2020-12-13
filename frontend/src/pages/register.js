import '../index.css';
import React from 'react';

function Register() {
    return (
        <div class="fixed z-10 inset-0 overflow-y-auto shadow-2xl bg-gray-100">
          <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                        <input type="text" placeholder="Firstname..." class="h-8 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-blue-500 rounded-md"/>
                        <input type="text" placeholder="Lastname..." class="h-8 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-blue-500 rounded-md"/>
                        <input type="text" placeholder="Email..." class="h-8 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-blue-500 rounded-md"/>
                        <input type="password" placeholder="Password..." class="h-8 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-blue-500 rounded-md"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <a href="/">
                  <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Register
                  </button>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
    )
}

export default Register;
