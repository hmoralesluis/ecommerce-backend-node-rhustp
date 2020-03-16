import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
    title: { type: String, required: true },
    /*products: [
        {type: Schema.Types.ObjectId,ref: 'Product'}
    ],*/
    description: { type: String },
    picture: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

export default model('Category', CategorySchema);