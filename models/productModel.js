import mongoose from 'mongoose';
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter a proudect name"]
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);
const Product = mongoose.model('Product', productSchema);
export default Product;