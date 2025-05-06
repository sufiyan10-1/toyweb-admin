import dbConnect from "@/lib/dbConnect";
import productModel from "@/models/productModel";
import { NextResponse } from 'next/server';

export async function GET(request) {
    await dbConnect();
 
    try {
        const allProduct = await productModel.find({});
        
        if (allProduct) {
            return NextResponse.json({
                success: true,
                products: allProduct,
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
