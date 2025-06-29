import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import productModel from "@/models/productModel";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { id, updatedProduct } = body;

    if (!id || !updatedProduct) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const {
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
      productRetings,
      dimensions,
    } = updatedProduct;

    const product = await productModel.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    // Update fields
    product.productName = productName;
    product.brand = brand;
    product.price = price;
    product.discount = discount;
    product.finalPrice = finalPrice ?? (price - discount);
    product.currency = currency;
    product.stock = stock;
    product.isAvailable = isAvailable;
    product.description = description;
    product.collectionId = collectionId;
    product.category = category;
    product.tags = tags;
    product.weight = weight;
    product.images = images;
    product.productRetings = productRetings;
    product.dimensions = dimensions;

    await product.save();

    return NextResponse.json({ message: "Product updated successfully!", product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
