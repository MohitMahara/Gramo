import mongoose from "mongoose";

export const connectDB = async() =>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Successfully connected to mongo database ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}