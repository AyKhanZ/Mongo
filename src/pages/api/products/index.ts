import { Products } from "../../../../lib/data";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET'){
        return res.status(200).json(Products)
    } if (req.method == 'POST'){
        const productData = {
            id: Products.length+1,  
            name: req.body.productName,
            desc: req.body.productDesc,
            img: req.body.productImg,
            productType: req.body.productType
        }

        Products.push(productData)

        return res.status(201).json(productData);
    }
}