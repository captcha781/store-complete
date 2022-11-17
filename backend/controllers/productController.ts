import express from "express"
import productModel from "../models/productModel"
import { RequestModified } from "../types"


export const getAllProducts = (req: RequestModified, res: express.Response) => {
    const { rangestart, rangeend, sortby, page, search } = req.query
    const category = req.body.category

    let findQueryWithSearch: any
    let findQueryWithoutSearch: any

    if (sortby !== "relevance") {
        let sortorder: any = sortby === "lth" ? 1 : -1

        if (category.length >= 1) {
            findQueryWithSearch = [{ $match: { $text: { $search: search as string }, price: { $gte: Number(rangestart), $lte: Number(rangeend) }, category: { $in: category } } }, { $sort: { price: sortorder } }]
            findQueryWithoutSearch = [{ $match: { price: { $gte: Number(rangestart), $lte: Number(rangeend) }, category: { $in: category } } }, { $sort: { price: sortorder } }]
        } else {
            findQueryWithSearch = [{ $match: { $text: { $search: search as string }, price: { $gte: Number(rangestart), $lte: Number(rangeend) } } }, { $sort: { price: sortorder } }]
            findQueryWithoutSearch = [{ $match: { price: { $gte: Number(rangestart), $lte: Number(rangeend) } } }, { $sort: { price: sortorder } }]

        }
        productModel.aggregate(search ? findQueryWithSearch : findQueryWithoutSearch).count("price")
            .then((count: any) => {
                productModel.aggregate(search ? findQueryWithSearch : findQueryWithoutSearch).skip(Number(page) * 16 - 16).limit(16)
                    .then(response => {
                        return res.json({ products: response, count:count[0].price })
                    })
                    .catch(err => {
                        return res.json({ message: err })
                    })
            })

    } else {
        if (sortby === "relevance" && category.length <= 0) {
            findQueryWithSearch = { price: { $gte: rangestart, $lte: rangeend }, $text: { $search: search as string } }
            findQueryWithoutSearch = { price: { $gte: rangestart, $lte: rangeend } }
        }
        else {
            findQueryWithSearch = { price: { $gte: rangestart, $lte: rangeend }, category: category, $text: { $search: search as string } }
            findQueryWithoutSearch = { price: { $gte: rangestart, $lte: rangeend }, category: category }
        }

        productModel.find(search ? findQueryWithSearch : findQueryWithoutSearch).count()
            .then(count => {
                productModel.find(search ? findQueryWithSearch : findQueryWithoutSearch).skip(Number(page) * 16 - 16).limit(16)
                    .then(response => {
                        return res.json({ products: response, count })
                    })
                    .catch(err => {
                        return res.json({ message: err })
                    })
            })
    }
}

export const searchProduct = (req: RequestModified, res: express.Response) => {
    const { id } = req.params
    productModel.findById(id)
        .then(foundResponse => {
            return res.json({ product: foundResponse })
        })
        .catch(err => {
            return res.json({ message: err })
        })
}

