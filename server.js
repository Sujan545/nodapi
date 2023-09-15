import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import productRoute from './routes/productRoute.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import cors from 'cors';    //server error


const app = express();
const MONGO_URL=process.env.MONGO_URL
const PORT=process.env.PORT||3000
const FRONTEND=process.env.FRONTEND


var corsOptions={
    origin:FRONTEND,
    optionsSuccessStatus:200//some legacy browsers choke on 204
}
app.use(cors(corsOptions));
app.use(express.json());
//middleware for form url encodded
app.use(express.urlencoded({ extended: false }))  

// Routes
app.use('/api/product',productRoute);
app.get('/', (req, res) => {
    //throw new Error('fake error');
    res.send('Hello NODE API');
});

app.use(errorMiddleware);
// Database connection
mongoose.set("strictQuery",false)
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Node API is running at port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
