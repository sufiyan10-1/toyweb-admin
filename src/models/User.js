import { Landmark } from "lucide-react";
import mongoose  from "mongoose";
 
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

const UserSchema = new mongoose.Schema({
   name: {
    type:  String,
    required: [true, "name is required"],
   },
   email: {
    unique: true,
    type:  String,
    required: [true, "email is required"],
   },
   password: {
    type: String,
    default: null
  },
  verificationCode: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationCodeExpiry:{
    type: Date,
    default: null,
  },
   credential: {
    type: String,
    required: [true, "Credential is required"],
  },
   addresses: {
    type: [addressSchema],
    default: [],
    validate: {
      validator: function (v) {
        return v.length <= 3;
      },
      message: props => `You can only have up to 3 addresses. You have ${props.value.length}.`
    }
  }
   
})
const UserModel = (mongoose.models.User) || mongoose.model('User', UserSchema);

export default UserModel;