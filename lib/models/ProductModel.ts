import mongoose, { Schema } from "mongoose";

export interface IProduct {
    id: string;
    name: string;
    price: number;
    description?: string;
    image?: string;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
});

const Product =
    mongoose.models.Product || mongoose.model("MyDb", productSchema);

export default Product;