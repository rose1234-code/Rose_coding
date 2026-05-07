import mongoose ,{ Schema } from "mongoose";
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["etudiant","enseignant","admin"],
        required:true,
        default:"etudiant"
    },
    cour:{
        type:String,
        required:function (){
            return this.role==="enseignant"
        }
    },
    profession:{
        type:String,
        required:function (){
            return this.role==="enseignant"
        }
    },
    bibliographie:{
        type:String,
        required:function () {
            return this.role==="enseignant"
        }
    }
},{timestamps:true})

const User=mongoose.models.User || mongoose.model('User',userSchema)

export default User