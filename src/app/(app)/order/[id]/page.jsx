'use client'

import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

function Page() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDetails = await axios.post("/api/fatch-order", { id });
        setOrder(orderDetails.data.order);
      } catch (err) {
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-gray-500" />
      </div>
    );
  }

  if (!order) {
    return <div className="text-center text-red-500 mt-10">Order not found.</div>;
  }

  return (
    <div className="mt-12 max-w-5xl mx-auto p-6 grid grid-cols-2 gap-6">

      {/* Order Info */}
      <div className="border rounded-xl p-5 shadow bg-white">
        <h2 className="text-lg font-bold mb-2">🧾 Order Information</h2>
        <div className="space-y-1">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Status:</strong> {order.orderStatus}</p>
          <p><strong>Ordered At:</strong> {new Date(order.orderAt).toLocaleString()}</p>
          <p><strong>Delivered At:</strong> {order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : 'Not Delivered Yet'}</p>
          <p><strong>Is Paid:</strong> {order.isPaid ? "Yes" : "No"}</p>
        </div>
      </div>

      {/* User Info */}
      <div className="border rounded-xl p-5 shadow bg-white">
        <h2 className="text-lg font-bold mb-2">👤 User Information</h2>
        <div className="space-y-1">
          <p><strong>Name:</strong> {order.user?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
        </div>
      </div>

      {/* Full Shipping Address */}
      <div className="border rounded-xl p-5 shadow bg-white">
        <h2 className="text-lg font-bold mb-2">📦 Shipping Address</h2>
        <div className="space-y-1">
          <p><strong>Full Name:</strong> {order.shippingAddress?.fullName}</p>
          <p><strong>Email:</strong> {order.shippingAddress?.email}</p>
          <p><strong>Phone:</strong> {order.shippingAddress?.countryCode} {order.shippingAddress?.phoneNo}</p>
          <p><strong>Address:</strong> {order.shippingAddress?.address}</p>
          <p><strong>City:</strong> {order.shippingAddress?.city}</p>
          <p><strong>State:</strong> {order.shippingAddress?.state}</p>
          <p><strong>Country:</strong> {order.shippingAddress?.country}</p>
          <p><strong>Pin Code:</strong> {order.shippingAddress?.pinCode}</p>
        </div>
      </div>

      {/* Product Info */}
      <div className="border rounded-xl p-5 shadow bg-white">
        <h2 className="text-lg font-bold mb-2">🛒 Product Details</h2>
        <div className="space-y-1">
          <p><strong>Product ID:</strong> {order.product?.productId}</p>
          <p><strong>Quantity:</strong> {order.product?.quantity}</p>
        </div>
      </div>

      {/* Payment Info */}
      <div className="border rounded-xl p-5 shadow bg-white">
        <h2 className="text-lg font-bold mb-2">💳 Payment Information</h2>
        <div className="space-y-1">
          <p><strong>Method:</strong> {order.paymentMethod}</p>
          <p><strong>Payment ID:</strong> {order.paymentInfo?.paymentId}</p>
          <p><strong>Status:</strong> {order.paymentInfo?.paymentstatus || 'Pending'}</p>
        </div>
      </div>

      {/* Pricing */}
      <div className="border rounded-xl p-5 shadow bg-white">
        <h2 className="text-lg font-bold mb-2">💰 Pricing Summary</h2>
        <div className="space-y-1">
          <p><strong>Product Amount:</strong> ₹{order.pricing?.productAmount}</p>
          <p><strong>Shipping Charges:</strong> ₹{order.pricing?.shippingCharges}</p>
          <p><strong>Tax:</strong> ₹{order.pricing?.tax}</p>
          <p className="font-bold"><strong>Total:</strong> ₹{order.pricing?.totalAmount}</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
