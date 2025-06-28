import orderModel from "@/models/orderModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function POST(request) {
    await dbConnect();
 
    try {

        const {id} = await request.json();
       
        const orderDetails = await  orderModel.findById(id);
        
        if (orderDetails) {
            return NextResponse.json({
                success: true,
                order: orderDetails,
            }, { status: 200 });
        } else {
            return NextResponse.json({
                success: false,
                message: 'There is no order found',
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
