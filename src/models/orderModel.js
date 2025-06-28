 
import mongoose  from "mongoose";
 
const userSchema = new mongoose.Schema({
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
     email: {
      type: String,
      default: null,
    }
})

const productSchema = new mongoose.Schema({
    productId: {
      type: String,
      required: [true, "product id is required"],
    },
    quantity: {
      type: Number,
      required: [true, "product name is required"],
    } 
})

const addressSchema = new mongoose.Schema({
   fullName:{
    type: String,
    required: [true, "full name id is required"],
   },
   email:{
    type: String,
    default: null
   },
   countryCode:{
    type: String,
    default: "+91"
   },
   phoneNo:{
    type: Number,
    required: [true, "phoneNo is required"],
   }, 
   address:{
     type: String,
     required: [true, "address is required"],
   },
   city:{
    type: String,
    required: [true, "city is required"],
   },
   state:{
    type: String,
    required: [true, "state is required"],
   },
   country:{
    type: String,
    default: "India"
   },
   pinCode:{
    type: Number,
    required: [true, "pinCode is required"],  
   },
   landmark:{
    type: String,
    default: null
   },
})
 
const paymentInfoSchema = new mongoose.Schema({
     paymentId: {
      type: String,
      default: null
    },
    paymentstatus: {
      type: String,
      default: null
    } 
})

const pricingSchema = new mongoose.Schema({
     productAmount: {
      type: Number,
      required: [true, "product Amount is required"],
    },
    shippingCharges: {
      type: Number,
      default: 0
    },
     tax: {
      type: Number,
      default: 0
    },
     totalAmount: {
      type: Number,
      default: 0
    }
})


const OrderSchema = new mongoose.Schema({
   orderId: {
    type:  String,
    required: [true, "order id is required"],
    unique: true,
   },
   user: userSchema,

   shippingAddress: addressSchema,
  
   product: productSchema,
 

   paymentMethod: {
    type:  String,
    required: [true, "Payment Method is required"],
    default: "cod"
   },
   paymentInfo: paymentInfoSchema, 
   
   pricing: pricingSchema,

   orderStatus: {
    type: String,
    default: null
   },
   isPaid: {
    type: Boolean,
    default: false,
   },
   orderAt: {
    type: Date,
     required: [true, "orderAt id is required"],
   },
   deliveredAt: {
    type: Date,
    default: null,
   }

})
const orderModel = (mongoose.models.orderModel) || mongoose.model('orderModel', OrderSchema);

export default orderModel;