import mongoose from 'mongoose';

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
        });
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log("Error while connecting to MongoDB",error);
    }
}; 

export default connectDb;
