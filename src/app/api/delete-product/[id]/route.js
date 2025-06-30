import dbConnect from "@/lib/dbConnect";
import productModel from "@/models/productModel";
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req, { params }) {
  const { id } = await params;

  await dbConnect();

  try {
    // Find the product
    const product = await productModel.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete Cloudinary images
    const images = product.images || [];
    for (const imageUrl of images) {
      const parts = imageUrl.split("/");
      const fileNameWithExt = parts[parts.length - 1];
      const publicId = `uploads/${fileNameWithExt.split(".")[0]}`; // Get public_id from URL

      await cloudinary.v2.uploader.destroy(publicId);
    }

    // Delete the product from MongoDB
    await productModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
