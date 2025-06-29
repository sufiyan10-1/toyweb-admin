'use client';

import axios from 'axios';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { toast } from 'sonner';

function EditableField({ label, value, onEdit }) {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-md">{value || 'N/A'}</p>
      </div>
      <Pencil className="w-4 h-4 text-blue-500 cursor-pointer" onClick={onEdit} />
    </div>
  );
}

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function Page() {
  const [product, setProduct] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [newTag, setNewTag] = useState('');
  const { id } = useParams();


  //fatch all the products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.post('/api/fatch-product', { id });
        setProduct(data.product);
        setOriginalProduct(data.product);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);


 //save changes temparary  
  const handleSave = () => {
    if (editField === 'dimensions') {
      setProduct({ ...product, dimensions: [editValue] });
    } else if (editField === 'tags') {
      setProduct({ ...product, tags: editValue.split(',') });
    } else {
      setProduct({ ...product, [editField]: editValue });
    }
    setEditField(null);
  };


 //save changes permanently 
 const handlePermanentSave = async () => {
  try {
  
    // Upload only new (blob) images
    const uploadedImages = await Promise.all(
      product.images.map(async (img) => {
        if (img.startsWith("blob:")) {
          const blob = await fetch(img).then(r => r.blob());
          const formData = new FormData();
          formData.append("file", blob);

          const res = await axios.post("/api/upload-image", formData);
          return res.data.url; // secure_url from Cloudinary
        } else {
          return img; // already uploaded
        }
      })
    );

    // Send updated product to backend
    await axios.post("/api/edit-product", {
      id: product._id,
      updatedProduct: {
        ...product,
        images: uploadedImages,
      },
    });

    toast.success("Product updated successfully!");
    setOriginalProduct({
      ...product,
      images: uploadedImages,
    }); // reset original for disable check

  } catch (error) {
    console.error("Update failed:", error);
    toast.error("Failed to update product.");
  } 
};



 //delete product 
  const handleDelete = () => {
    setDeleteConfirm(false);
    alert('Product deleted');
  };

  const removeTag = (index) => {
    const updatedTags = [...product.tags];
    updatedTags.splice(index, 1);
    setProduct({ ...product, tags: updatedTags });
  };

  const addTag = () => {
    if (newTag.trim() !== '') {
      setProduct({ ...product, tags: [...(product.tags || []), newTag.trim()] });
      setNewTag('');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-gray-500" />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center text-red-500 mt-10">Product not found.</div>;
  }

  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📦 Product Details</h1>
        <button
          className={`px-6 py-2 rounded-sm text-center text-white ${
            isEqual(product, originalProduct)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={isEqual(product, originalProduct)}
          onClick={handlePermanentSave}
        >
          Save
        </button>
      </div>

      <div className="border rounded-xl p-5 shadow bg-white space-y-4">
        <EditableField label="Product Name" value={product.productName} onEdit={() => { setEditField('productName'); setEditValue(product.productName); }} />
        <EditableField label="Brand" value={product.brand} onEdit={() => { setEditField('brand'); setEditValue(product.brand); }} />
        <EditableField label="Category" value={product.category} onEdit={() => { setEditField('category'); setEditValue(product.category); }} />
        <EditableField label="Currency" value={product.currency} onEdit={() => { setEditField('currency'); setEditValue(product.currency); }} />
        <EditableField label="Description" value={product.description} onEdit={() => { setEditField('description'); setEditValue(product.description); }} />
        <EditableField label="Stock" value={product.stock} onEdit={() => { setEditField('stock'); setEditValue(product.stock); }} />
        <EditableField label="Price" value={`₹${product.price}`} onEdit={() => { setEditField('price'); setEditValue(product.price); }} />
        <EditableField label="Discount" value={`${product.discount}%`} onEdit={() => { setEditField('discount'); setEditValue(product.discount); }} />
        <EditableField label="Final Price" value={`₹${product.finalPrice}`} onEdit={() => { setEditField('finalPrice'); setEditValue(product.finalPrice); }} />
        <EditableField label="Is Available" value={product.isAvailable ? 'Yes' : 'No'} onEdit={() => { setEditField('isAvailable'); setEditValue(product.isAvailable); }} />
        <EditableField label="Ratings" value={product.productRetings} onEdit={() => { setEditField('productRetings'); setEditValue(product.productRetings); }} />
        <EditableField label="Weight" value={product.weight} onEdit={() => { setEditField('weight'); setEditValue(product.weight); }} />
      </div>

      <div className="border rounded-xl p-5 shadow bg-white space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">📐 Dimensions</h2>
          <Pencil className="w-4 h-4 text-blue-500 cursor-pointer" onClick={() => { setEditField('dimensions'); setEditValue({ ...product.dimensions?.[0] }); }} />
        </div>
        {product.dimensions?.map((d, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 text-sm">
            <p><strong>Height:</strong> {d.height}</p>
            <p><strong>Length:</strong> {d.length}</p>
            <p><strong>Width:</strong> {d.width}</p>
          </div>
        ))}
      </div>

      <div className="border rounded-xl p-5 shadow bg-white space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">🏷️ Tags</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.tags?.map((tag, i) => (
            <span key={i} className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center">
              {tag}
              <button onClick={() => removeTag(i)} className="ml-2 text-red-500 hover:text-red-700">✕</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add new tag"
            className="border rounded px-2 py-1 text-sm"
          />
          <button onClick={addTag} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Add</button>
        </div>
      </div>

      <div className="border rounded-xl p-5 shadow bg-white space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">🖼️ Product Images</h2>
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const newUrl = URL.createObjectURL(file);
              setProduct((prev) => ({ ...prev, images: [...prev.images, newUrl] }));
            }
          }} />
        </div>
        <div className="flex gap-4 flex-wrap">
          {product.images?.map((img, i) => (
            <div key={i} className="relative w-32 h-32">
              <img src={img} alt="Product" className="w-full h-full object-cover rounded-lg border" />
              <button
                onClick={() => {
                  setEditField('deleteImage');
                  setEditValue(i);
                }}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10 border rounded-xl p-5 shadow bg-white space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-1"><Trash2 className="w-6 h-6" /> Delete Product</h2>
          <button
            onClick={() => setDeleteConfirm(true)}
            className="flex items-center gap-1 px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editField} onClose={() => setEditField(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Edit {editField}</h3>
            {editField === 'dimensions' ? (
              <div className="space-y-2">
                <input className="w-full border rounded px-3 py-2" type="number" placeholder="Height" value={editValue.height} onChange={(e) => setEditValue({ ...editValue, height: e.target.value })} />
                <input className="w-full border rounded px-3 py-2" type="number" placeholder="Length" value={editValue.length} onChange={(e) => setEditValue({ ...editValue, length: e.target.value })} />
                <input className="w-full border rounded px-3 py-2" type="number" placeholder="Width" value={editValue.width} onChange={(e) => setEditValue({ ...editValue, width: e.target.value })} />
              </div>
            ) : editField === 'deleteImage' ? (
              <>
                <p className="text-red-600 font-semibold">⚠️ Are you sure you want to delete this image?</p>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setEditField(null)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                  <button onClick={() => {
                    const newImages = [...product.images];
                    newImages.splice(editValue, 1);
                    setProduct({ ...product, images: newImages });
                    setEditField(null);
                  }} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
                </div>
              </>
            ) : (
              <input className="w-full border rounded px-3 py-2 mb-4" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
            )}
            {editField !== 'deleteImage' && (
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setEditField(null)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
              </div>
            )}
          </div>
        </div>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-2 text-red-600">⚠️ Confirm Deletion</h3>
            <p className="text-sm mb-4">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteConfirm(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Page;
