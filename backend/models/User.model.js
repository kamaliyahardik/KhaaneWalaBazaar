const userSchma = new mongoose.Schema({
    fullname: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
    },
    mobile: { 
        type: String, 
        required: true
    }, 
    role:{
        type: String,
        enum: ["user", "owner", "deliveryboy"],
        required: true,
    }
}, { timestamps: true });



const User = mongoose.model('User', userSchma);
export default User;