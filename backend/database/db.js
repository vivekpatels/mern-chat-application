import mongoose from "mongoose";

const connectToMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Mongodb');
        
    } catch (error) {
        console.log("Connection to mongodb failed", error.message)
    }
}

export default connectToMongoDB;