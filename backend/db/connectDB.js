import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB;