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
            const product = await Product.findOne({ _id: req.params.id });
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
            const { id } = req.params;
            const product = await Product.findOneAndUpdate({_id: id}, req.body, {new:true});
            res.json({status: res.status, data: product});
        } catch (error)  {
            console.log(error);
        } 
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            await Product.findOneAndRemove({ _id: req.params.id });
            res.json({ response: 'Product deleted Successfully' });
        } catch (error)  {
            console.log(error);
        } 
    }

    routes() {
        this.router.get('/', this.getProducts);
        this.router.get('/:id', this.getProduct);
        this.router.post('/', this.createProduct);
        this.router.put('/:id', this.updateProduct);
        this.router.delete('/:id', this.deleteProduct);
    }
}

const productRoutes = new ProductRouter();

export default productRoutes.router;