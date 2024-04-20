import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../../lib/db";
import NewsModel from "../../../../../lib/models/NewsModel";

// page/api/news/[id]/index.ts
const getById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectDB();

        if (req.method === "GET") {
            const id = typeof req.query.id === "string" ? req.query.id : "";
            const news = await NewsModel.findById(id);
            if (!news) {
                return res.status(404).json({ error: "News not found" });
            }
            return res.status(200).json(news);
        }
    } catch (error) {
        return res.status(500).json({ error: "Error fetching news" });
    }
};

const updateById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectDB();

        if (req.method === "PUT") {
            const { title, description, img } = req.body;
            const id = typeof req.query.id === "string" ? req.query.id : "";
            const news = await NewsModel.findByIdAndUpdate(
                id,
                {
                    title,
                    description,
                    img,
                },
                { new: true }
            );
            if (!news) {
                return res.status(404).json({ error: "News not found" });
            }
            return res.status(200).json(news);
        }
    } catch (error) {
        return res.status(500).json({ error: "Error updating news!" });
    }
};

const deleteById = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectDB();

        if (req.method === "DELETE") {
            const id = typeof req.query.id === "string" ? req.query.id : "";
            const news = await NewsModel.findByIdAndDelete(id);
            if (!news) {
                return res.status(404).json({ error: "News not found" });
            }
            return res.status(200).json(news);
        }
    } catch (error) {
        return res.status(500).json({ error: "Error deleting news" });
    }
};
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        return getById(req, res);
    }

    if (req.method === "PUT") {
        return updateById(req, res);
    }

    if (req.method === "DELETE") {
        return deleteById(req, res);
    }
}
