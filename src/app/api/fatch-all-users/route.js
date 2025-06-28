import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from 'next/server';

export async function POST(request) {
    await dbConnect();
 
    try {
        const allUsers = await  UserModel.find({});
        
        if (allUsers) {
            return NextResponse.json({
                success: true,
                users: allUsers,
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
