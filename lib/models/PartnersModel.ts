import { News } from "@/types";
import mongoose, { Schema } from "mongoose";

const partnersSchema = new Schema<News>({
    title: { type: String, required: true }, 
    description: { type: String },
    img: { type: String, required: true },
    imageFile: { type: String },
});

const PartnersModel = mongoose.models.News || mongoose.model("Partners", partnersSchema);

export default PartnersModel;
