'use client'
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function page() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await axios.post("api/fatch-all-orders");
        setOrders(allOrders.data.orders)
        console.log(allOrders)
        
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
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
            
            <th className="px-4 py-2 text-left">Order ID</th>
            <th className="px-4 py-2 text-left">Product ID</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Total Amount</th>
             <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
            
              <td className="px-4 py-2">{order.orderId}</td>
              <td className="px-4 py-2">{order.product.productId}</td>
              <td className="px-4 py-2">{order.product.quantity}</td>
              <td className="px-4 py-2">{order.pricing.totalAmount}</td>  
              <td className="">
                      <Link href={`/order/${order._id}`}>  <button className="cursor-pointer hover:bg-blue-500 bg-blue-600 py-1 px-2 rounded-sm text-white"> View All</button>
                     </Link>
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page
