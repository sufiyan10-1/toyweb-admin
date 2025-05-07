"use client";

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AddProduct() {
  const { register, handleSubmit } = useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      const formData = new FormData();
    
      
      formData.append('productName', data.productName);
      formData.append('brand', data.brand);
      formData.append('price', data.price);
      formData.append('discount', data.discount);
      formData.append('currency', data.currency);
      formData.append('stock', data.stock);
      formData.append('category', data.category);
      formData.append('tags', data.tags);
      formData.append('weight', data.weight);
      formData.append('length', data.length);
      formData.append('width', data.width);
      formData.append('height', data.height);
      formData.append('description', data.description);
 

      const uploadedImageUrls = await Promise.all(
        selectedImages.map(async (file) => {
         
          formData.append('file', file);
          const response = await axios.post('/api/add-product',  formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          toast({
            title: 'Success!',
            description: response.data.message,
          });
        })
      );

      const finalData = { ...data, images: uploadedImageUrls };
      console.log('Final Form Data:', finalData);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: 'Success!',
        description: error,
        variant: 'destructive',
      });
    }
    setIsSubmitting(false)
  };

  const handleImageChange = (file, index) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = file;
      return newImages;
    });
  };

  const addImageField = () => {
    setSelectedImages([...selectedImages, null]);
  };

  const removeImageField = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 w-full  mx-auto rounded-lg">
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <input {...register("productName")} type="text" placeholder="Product Name" className="border p-2 rounded-lg" />
      <input {...register("brand")} type="text" placeholder="Brand" className="border p-2 rounded-lg" />
      <input {...register("price")} type="number" placeholder="Price" className="border p-2 rounded-lg"/>
      <input {...register("discount")} type="number" placeholder="Discount" className="border p-2 rounded-lg" />
      <input {...register("currency")} type="text" placeholder="Currency" className="border p-2 rounded-lg"/>
      <input {...register("stock")} type="number" placeholder="Stock"  className="border p-2 rounded-lg" />
      <select {...register("isAvailable")} className="border p-2 rounded-lg">
        <option value="true">Available</option>
        <option value="false">Not Available</option>
      </select>
      <input {...register("category")} type="text" placeholder="Category"className="border p-2 rounded-lg"/>
      <input {...register("tags")} type="text" placeholder="Tags (comma separated)" className="border p-2 rounded-lg"/>
      <input {...register("weight")} type="number" placeholder="Weight" className="border p-2 rounded-lg" />
      <input {...register("length")} type="number" placeholder="Length" className="border p-2 rounded-lg" />
      <input {...register("width")} type="number" placeholder="Width" className="border p-2 rounded-lg" />
      <input {...register("height")} type="number" placeholder="Height" className="border p-2 rounded-lg" />
      <textarea {...register("description")} placeholder="Description" className="h-40 col-span-2 border p-2 rounded-lg"></textarea>
      

        <div className="col-span-2">
          <label className="block mb-1">Images</label>
          {selectedImages.map((image, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input 
                type="file" 
                accept="image/*" 
                className="p-2 rounded bg-gray-800 text-white w-full"
                onChange={(e) => handleImageChange(e.target.files[0], index)}
              />
              {image && (
                <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} className="w-16 h-16 rounded" />
              )}
              <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => removeImageField(index)}
              >
                ✖
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            onClick={addImageField}
          >
            +
          </button>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded col-span-2">
        {isSubmitting ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                'Add Product'
              )}
        </button>
      </form>
    </div>
  );
}
