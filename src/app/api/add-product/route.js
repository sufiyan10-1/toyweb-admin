// /api/add-product/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import productModel from "@/models/productModel";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();

    const {
      productName,
      brand,
      price,
      discount,
      finalPrice = price - discount,
      currency,
      stock,
      isAvailable,
      description,
      collectionId,
      category,
      tags,
      weight,
      images,
      length,
      width,
      height,
    } = body;

    const newProduct = new productModel({
      productName,
      brand,
      price,
      discount,
      finalPrice,
      currency,
      stock,
      isAvailable,
      description,
      collectionId,
      category,
      tags,
      weight,
      images,
      productRetings: 4,
      dimensions: [{ length, width, height }],
    });

    await newProduct.save();

    return NextResponse.json({ message: "Product uploaded successfully!", product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
