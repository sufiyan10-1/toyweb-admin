import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import dbConnect from "@/lib/dbConnect";
import productModel from "@/models/productModel";
 

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  await dbConnect();
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    const productName = formData.get("productName");
    const brand = formData.get("brand");
    const price = parseInt(formData.get("price"));
    const discount = parseInt(formData.get("discount"));
    const currency = formData.get("currency");
    const stock = parseInt(formData.get("stock"));
    const isAvailable = formData.get("isAvailable") === "true";
    const category = formData.get("category");
    const tags = formData.get("tags")?.split(",") || [];
    const weight = parseInt(formData.get("weight"));
    const length = parseInt(formData.get("length"));
    const width =  parseInt(formData.get("width"));
    const height = parseInt(formData.get("height"));
    const description = formData.get("description");

    if (!file) {
      return NextResponse.json({ error: "No file exists" }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload file to Cloudinary
    const cloudinaryUploadedFile = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      ).end(buffer);
    });

   
const newProduct = new productModel({
 
  productName,
  brand,
  price,
  discount,
  finalPrice: price - discount,
  currency,
  stock,
  isAvailable,
  description,
  category,
  tags,
  weight,
  images: [cloudinaryUploadedFile],  
  productRetings: 4,
  dimensions: [{ length, width, height }],
});

 
await newProduct.save();

return NextResponse.json(
  { message: "Product uploaded successfully!", product: newProduct },
  { status: 201 }
);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
