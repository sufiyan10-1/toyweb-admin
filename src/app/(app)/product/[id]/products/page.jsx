'use client';

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

 

 

const AdminTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/fatch-all-product');
        const data = await res.json();
        setProducts(data.products || []);  
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
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
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Stock</th>
             <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="px-4 py-2">
                <Image
                  src={product.images[0]}
                  alt="product image"
                  width={48}
                  height={48}
                  className="rounded object-cover"
                />
              </td>
              <td className="px-4 py-2">{product._id}</td>
              <td className="px-4 py-2">{product.productName}</td>
              <td className="px-4 py-2">₹{product.price}</td>
              <td className="px-4 py-2">{product.stock}</td>
            
                  <td className="">
                      <Link href={`/product/${product._id}`}>  <button className="cursor-pointer hover:bg-blue-500 bg-blue-600 py-1 px-2 rounded-sm text-white"> View All</button>
                     </Link>
                  </td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
