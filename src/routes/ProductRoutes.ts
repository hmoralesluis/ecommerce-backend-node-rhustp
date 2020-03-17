import { Router, Request, Response } from 'express';

import Product from '../models/Product';

class ProductRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await Product.find();
            res.json({ products });
        } catch (error)  {
            console.log(error);
        } 
    }

    public async getProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await Product.find({ title: { $regex: req.params.title } });
            res.json(product);
        } catch (error)  {
            console.log(error);
        } 
    }

    public async createProduct(req: Request, res: Response): Promise<void>{
        try {
            const { title, category, price, old_price, picture, description } = req.body;
            const newProduct= new Product({title, category, price, old_price, picture, description});
            await newProduct.save();
            res.json({status: res.status, data: newProduct});
        } catch (error)  {
            console.log(error);
        } 

    }

    public async updateProduct(req: Request, res: Response): Promise<void>{
        try {
            const { title } = req.params;
            const product = await Product.findOneAndUpdate({title}, req.body);
            res.json({status: res.status, data: product});
        } catch (error)  {
            console.log(error);
        } 
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            await Product.findOneAndRemove({ title: req.params.title });
            res.json({ response: 'Product deleted Successfully' });
        } catch (error)  {
            console.log(error);
        } 
    }

    routes() {
        this.router.get('/', this.getProducts);
        this.router.get('/:title', this.getProduct);
        this.router.post('/', this.createProduct);
        this.router.put('/:title', this.updateProduct);
        this.router.delete('/:title', this.deleteProduct);
    }
}

const productRoutes = new ProductRouter();

export default productRoutes.router;