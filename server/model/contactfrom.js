const mongoose=require("mongoose");
const contactSchema= new mongoose.Schema(
   {
    firstName:{
        type:String, trim: true, required: true, maxlength:50
    },

    lastName:{
        type:String,
        trim:true,
        maxlenght:50,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        lowerCase:true,
        mexlength:120

    },
    phone:{
        type:String,
        trim:true,
        required:true,
        maxlength:120
    },

  message:{
    type:String,
    trim:true,
    required:true,
    maxlength:4000
  },

ip: { type: String, trim: true },
    userAgent: { type: String, trim: true },
    status: { type: String, enum: ["new", "processed"], default: "new" },

   } ,
    { timestamps: true }
)


module.exports = mongoose.model("ContactMessage", contactSchema);
