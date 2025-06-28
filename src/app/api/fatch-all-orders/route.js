import dbConnect from "@/lib/dbConnect";
import orderModel from "@/models/orderModel";
import { NextResponse } from "next/server";


export async function POST(request) {
   await dbConnect();
   
   try {

      const allOrders = await orderModel.find({});
            
            if (allOrders) {
                return NextResponse.json({
                    success: true,
                    orders: allOrders,
                }, { status: 200 });
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'There are no pending identities',
                }, { status: 400 });
            }
    
   } catch (error) {
     console.log("Unexpected error occurred: " + error);
        return NextResponse.json({
            success: false,
            message: 'There is an error in the API for getting pending identities',
        }, { status: 500 });
   }
}