import mongoose,{Schema, Document} from "mongoose";


const reviews = new mongoose.Schema({
    userId:{
      type: String
    },
    comment:{
        type: String
    },
    rating:{
        type: Number
    }
  
  });

const dimensions = new mongoose.Schema({
    length:{
      type: Number
    },
    width:{
        type: Number
    },
    height:{
        type: Number
    }
  
  });  

const ProductSchema = new mongoose.Schema({
   
  productName: {
    type:  String,
    required: [true, "ProductName is required"],

   },
   brand: {
    type: String,
    required: [true, 'brand is required'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  discount: {
    type: Number,
    
  },
   collectionId: {
    type: Number,
    default: 4
    
  },
   description: {
    type: String,
    required: [true, "description is required"],
    
   },
   category: {
    type: String,
    required: [true, 'category is required'],
  },
  
  tags:[{ 
    type: String,
    required: true, 
   }],
  
 
  finalPrice: {
    type: Number,
    required: [true, 'finalPrice is required'],
  },
  currency: {
    type: String,
    required: [true, 'currency is required'],
  },
  stock: {
    type: Number,
    required: [true, 'stock is required'],
  },
  isAvailable: {
    type: Boolean,
    required: [true, 'stock is required'],
    default: true
  },
   
   images:[{ 
    type: String,
    required: true, 
   }],
    
   productRetings:  {
    type: Number,
    default: 0
   },
   reviews:[reviews],
   weight: {
     type: Number,
     required: [true, 'product Weight is required'],
   },
   
   shippingCharge: {
    type: Number, 
  }, 
  dimensions: [dimensions]
   
})
const productModel = (mongoose.models.productModel) || mongoose.model('productModel', ProductSchema);

export default productModel;