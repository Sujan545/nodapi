import express from 'express';
import Product from'../models/productModel.js';
import obj from '../controller/productController.js';


const router = express.Router();


//fetch all data from databases
router.get('/', obj.getProducts);
//Update oor edit data in database
router.put('/:id',obj.updateProduct );
//delete a product from database
router.delete('/:id', obj.deleteProduct);
//fetch single data from database using id 
router.get('/:id',obj.getProduct);
// write data in database
router.post('/',obj.createProduct);
export default router;