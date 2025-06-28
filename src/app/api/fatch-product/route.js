import productModel from "@/models/productModel";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function POST(request) {
    await dbConnect();
 
    try {

        const {id} = await request.json();
       
        const productDetails = await  productModel.findById(id);
        
        if (productDetails) {
            return NextResponse.json({
                success: true,
                product: productDetails,
            }, { status: 200 });
        } else {
            return NextResponse.json({
                success: false,
                message: 'There is no pro found',
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
