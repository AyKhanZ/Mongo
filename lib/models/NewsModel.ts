import { News } from "@/types";
import mongoose, { Schema } from "mongoose";

const newsSchema = new Schema<News>({
    title: { type: String, required: true },
    description: { type: String },
    img: { type: String, required: true },
    imageFile: { type: String },
});

const NewsModel = mongoose.models.News || mongoose.model("News", newsSchema);

export default NewsModel;