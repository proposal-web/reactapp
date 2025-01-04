import React from 'react';

const Footer = () => {
    return (
         <footer className="mt-10 bg-gray-900 text-gray-200 py-8 text-center font-sans relative ">

              <div className='md:flex justify-center items-center  max-w-4xl m-auto'>  {/* Changed this section   */}
              <div className = "py-2 px-4  border-r border-gray-700 border-opacity-50  flex-1">   {/* Added  flex-1 here*/}

                 <h4 className=" text-lg  mb-2 font-bold uppercase">
                      Technical Support
                  </h4>

                 <p className ="text-md ">
                   <span  className="font-medium"  >
                          Dipesh Balodiya

                     </span>

                      </p>
                     <p className ="text-md  text-gray-400" >
                               Contact: +91 9131715108
                        </p>
                  </div>

                      <div className = "py-2  px-4  flex-1 "  >   {/*  Added  flex-1 here*/}
                  <h4 className="text-lg mb-2 font-bold uppercase"  >
                           Queries Related To Event
                        </h4>

                  <p className ="text-md ">
                        <span  className="font-medium"  >Umang Sharma </span>

                          </p>
                 <p className ="text-md text-gray-400" >
                           Contact:+91 8602083290

                         </p>


                    </div>


                  </div>
                <div className="mt-8 text-xs text-center  text-gray-500 font-mono absolute  bottom-0 left-0 right-0">

                Copyright © {new Date().getFullYear()} by IPS Academy IES.
                All Rights Reserved.

             </div>

      </footer>
       );
 };
 export default Footer;