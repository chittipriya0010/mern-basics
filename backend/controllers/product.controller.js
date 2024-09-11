import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products});
    } catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const createProducts = async (req,res) => {
    const product = req.body; // user will send the data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }
        const newProduct = new Product(product)

        try {
            await newProduct.save()
            res.status(201).json({ success: true, data: newProduct});
        } catch (error) {
            console.log("Error in Create product:", error.message);
            res.status(500).json({ success: false, message: "Server Error"});
        }
};

export const  updateProducts = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Product is not found by this id" });
    }

    try {
        const updateProducts = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({ success: true, data: updateProducts})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const deleteProducts = async (req,res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product has been deleted successfully!" });
    } catch (error) {
        console.log("error in deleting products:", error.message);
        res.status(404).json({ success: false, message: "Product is not found" });
    }
};