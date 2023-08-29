import express from 'express';
import mongoose from 'mongoose';
import Product from './models/productModel.js';

const app = express();
app.use(express.json());
//middleware for form url encodded
app.use(express.urlencoded({ extended: false }))  

// Routes
app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

//all data fetch from database
app.get('/product', async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//Update oor edit data in database
app.put('/product/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
       //we can not find any product in database
        if (!product) {
            return res.status(404).json({ message: `can not find any product with id ${id}` })
        }
        const updatedProduct=await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
//delete a product from database
app.delete('/product/:id',async(req,res)=>{
    try{
        const{id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            return req.status(404).json({message:`can  not find any product id ${id}`})
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message})
    }
});

//fetch single data from database using id 
app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// write data in database

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Database connection
mongoose
    .connect('mongodb+srv://admin:admin123@devapi.7eh7imf.mongodb.net/Node-Api?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true, // Add this option
    })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Node API is running at port 3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
