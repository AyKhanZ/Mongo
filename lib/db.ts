import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

const connectDB = async () => {
  if (connection.isConnected) {
    console.log("Using existing connection", connection.isConnected);
    return;
  }

  await mongoose.connect(
    "mongodb+srv://ARnold151618:ARnold151618@baim.lwsefis.mongodb.net/mongodb+srv://bahram:toor@cluster0.gl6zzct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  connection.isConnected = mongoose.connections[0].readyState;
  console.log("Connection established");
};

export default connectDB;
