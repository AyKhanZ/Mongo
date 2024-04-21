import { News } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import NewsModel from "../../../../lib/models/NewsModel";
import connectDB from "../../../../lib/db";

// Ayxan
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<News[]>
) {
    await connectDB();

    if (req.method === "GET") {
        try {
            let news = await NewsModel.find();
            news = news.map((item) => {
                const imageBuffer = item.img;
                const imageBase64 = imageBuffer.toString("base64");
                item.img = `data:image/jpeg;base64${imageBase64}`;
                return item;
            });
            return res.status(200).json(news);
        } catch (error: any) {
            return res.status(500).json(error);
        }
    }

    if (req.method === "POST") {
        const { title, description, img, imageFile } = req.body;
        const news = new NewsModel({
            title,
            description,
            img,
            imageFile,
        });
        try {
            await news.save();
            return res.status(201).json(news);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json(error);
        }
    }

    if (req.method === "DELETE") {
        const { id } = req.body;
        try {
            const news = await NewsModel.findByIdAndDelete(id);
            return res.status(200).json(news);
        } catch (error: any) {
            return res.status(500).json(error);
        }
    }
}