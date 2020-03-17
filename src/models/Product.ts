import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    title: { type: String, required: true },
    category: {type: Schema.Types.ObjectId,ref: 'Category'},
    price: { type: Number },
    oldPrice: {type: Number},
    description: { type: String },
    picture: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

export default model('Product', ProductSchema);