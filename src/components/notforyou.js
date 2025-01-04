import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const NoteForYOU = () => {
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState([]);
     const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false); // Track loading state for both users and projects
   const [authenticationError, setAuthenticationError] = useState(null);
    useEffect(() => {
         setIsLoggedIn(false);
    }, []);
     const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (password === 'ipsscienceexibition') { // use static password again. Please DO NOT USE IN PRODUCTION

            setIsLoggedIn(true);

             try{
                     fetchUsers();
                     fetchProjects();
               }
                catch(err){

                setAuthenticationError("fetching Users Failed")
                 setIsLoggedIn(false)
              }
              finally{
                  setLoading(false)
                }
        } else {
              setAuthenticationError('Invalid password');
              setIsLoggedIn(false)
          setLoading(false);

        }
  };


  const fetchUsers = async () => {
          const querySnapshot = await getDocs(collection(db, 'users'));
          const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUsers(usersData);
   };

   const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
     const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
       setProjects(projectsData);
    };

    const handleDownloadUsers = () => {
       const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
       const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(data, 'users.xlsx');
     };


    const handleDownloadProjects = () => {
    // Prepare data to export
       const exportData = projects.map(project => {

      const teamMembersData =  project.teamMembers.map(member => {

           return   {
           'Project ID':project.id,
            'Team Member Salutation':member.salutation,
           'Team Member First Name' : member.firstName,
          'Team Member Last Name': member.lastName,
               'Team Member Email' : member.email,
                'Team Member Mobile' : member.mobile,
              'Team Member College': member.college,
               'Team Member Year' : member.year,
               'Team Member Branch':member.branch,
               'Project Name' : project.projectName,
               'Project Description' : project.projectDescription,

        }


         });
      return teamMembersData
  }).flat() // We use `flat()` function here to correctly parse the result which was coming as nested array earlier.

     const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'projects.xlsx');
  };


  if (!isLoggedIn)
   {
      return (
           <div id="admin-panel" className="p-5 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
               <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                  {authenticationError && <p className="text-red-500">{authenticationError}</p>}
                <form onSubmit={handleLogin}>

                    <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                           </label>
                        <input
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="password"
                            type="password"
                             value={password}
                           onChange={(e) => setPassword(e.target.value)}
                         required
                       />
                     </div>
                  <button
                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                           type="submit"  disabled={loading}
                 >
                        {loading? 'Authenticating...': 'Login'}
                 </button>

              </form>
            </div>
          );
   }
     else {
     return (
         <div id="admin-panel" className="p-5 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
             <h3 className="text-xl font-bold mb-4">Users</h3>
           <table className="w-full border-collapse border border-gray-300">
               <thead>
                     <tr className="bg-gray-200">
                      <th className ="border border-gray-300 px-4 py-2">ID</th>
                          <th className="border border-gray-300 px-4 py-2">Name</th>
                           <th className="border border-gray-300 px-4 py-2">Email</th>
                     </tr>
             </thead>
           <tbody>
            {users.map(user => (
                 <tr key={user.id}>
                      <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.displayName || `${user.salutation} ${user.firstName} ${user.lastName}` }</td>
                     <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                </tr>
             ))}
          </tbody>
           </table>

          <button
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDownloadUsers}
           >
            Download Users as XLSX
             </button>


          <h3 className="text-xl font-bold mb-4 mt-8">Projects</h3>
         <table className="w-full border-collapse border border-gray-300">
             <thead>
                <tr className="bg-gray-200">
                   <th className="border border-gray-300 px-4 py-2">ID</th>
                   <th className="border border-gray-300 px-4 py-2">Project Name</th>
                   <th className="border border-gray-300 px-4 py-2">Description</th>
             </tr>
             </thead>
            <tbody>
                {projects.map(project => (
                   <tr key={project.id}>
                      <td className="border border-gray-300 px-4 py-2">{project.id}</td>
                      <td className="border border-gray-300 px-4 py-2">{project.projectName}</td>
                       <td className="border border-gray-300 px-4 py-2">{project.projectDescription}</td>

                       </tr>
                      ))}
             </tbody>
            </table>
         <button
                 className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
             onClick={handleDownloadProjects}
             >
               Download Projects as XLSX
             </button>
          </div>
      );
    }
 };
export default NoteForYOU;