import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

const connectDB = async () => {
    if (connection.isConnected) {
        console.log("Using existing connection", connection.isConnected);
        return;
    }

    await mongoose.connect(
        "mongodb+srv://diana:diana@baim.lkwgfw1.mongodb.net/?retryWrites=true&w=majority&appName=Baim"
    );

    connection.isConnected = mongoose.connections[0].readyState;
    console.log("Connection established");
};

export default connectDB;
