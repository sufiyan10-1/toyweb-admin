'use client'
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function page() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await axios.post("api/fatch-all-users");
        setUsers(allUsers.data.users)
        console.log(allUsers)
        
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  
if(loading === true){
  return (
   <div className="flex items-center justify-center h-screen">
  <Loader2 className="animate-spin w-15 h-15 text-gray-500" />
</div>

  )
}
     


  return (
    <div className="mt-14 overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            
            <th className="px-4 py-2 text-left">User ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Login Credentials</th>
             
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t">
            
              <td className="px-4 py-2">{user._id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.credential}</td>  
             
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page
