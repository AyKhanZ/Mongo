import { NextApiRequest, NextApiResponse } from "next";
import { Products } from "../../../../lib/data";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {productId} = req.query

    const product = Products.find(p => p.id === Number(productId));
    const productIndex = Products.findIndex(p => p.id === Number(productId))

    if (typeof productId === 'string'){ 
        if (req.method=='PUT'){
            const productData = {
                id: req.body.id, 
                name: req.body.productName,
                desc: req.body.productDesc, 
                img: req.body.productImg,
                productType: req.body.productType
            }

            Products[Number(productIndex)] = productData;
            res.status(200).json(productData)
        }
        if (req.method == 'GET'){
            res.status(202).json(product)
        }

        if (req.method=='DELETE'){
            Products.splice(Number(productIndex), 1)
            res.status(200).json(product)
        }
    }
}