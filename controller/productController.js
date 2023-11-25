import Product from'../models/productModel.js'
import asyncHandler from 'express-async-handler'

// get all product from databases
const getProducts=async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

// get single product from databases using async express error handler
const getProduct=asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
       
    }
})

//create product in database
const createProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

//Delete product from databases
const deleteProduct= asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(500);
            throw new Error( `can  not find any product id ${id}` );
            
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
//update product in databases
const updateProduct =asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //we can not find any product in database
        if (!product) {
            res.status(500);
            throw new Error( `can  not find any product id ${id}` );
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
}
})
//creating object and exporting
 const obj= {
getProducts,
getProduct,
createProduct,
deleteProduct,
updateProduct
};
export default obj;