import { News } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import NewsModel from "../../../../lib/models/NewsModel";
import connectDB from "../../../../lib/db";

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
                return news;
            });
            return res.status(200).json(news);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching news" });
        }
    }

    // if (req.method === "POST") {
    //     const { title, description, img } = req.body;
    //     const newsData: News = {
    //         title,
    //         description,
    //         img,
    //     };

    //     const news = await NewsModel.create(newsData);
    //     return res.status(201).json(news);
    // }
}
