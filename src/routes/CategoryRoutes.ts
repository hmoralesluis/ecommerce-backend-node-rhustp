import { Router, Request, Response } from 'express';

import Category from '../models/Category';
import Product from '../models/Product';

class CategoryRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await Category.find();
            res.json({ categories });
        } catch (error)  {
            console.log(error);
        } 
    }

    public async getCategory(req: Request, res: Response): Promise<void> {
        try {
            const category = await Category.findOne({ _id: req.params.id });
            res.json(category);
        } catch (error)  {
            console.log(error);
        } 
    }

    public async createCategory(req: Request, res: Response): Promise<void>{
        try {
            const { title, description, picture } = req.body;
            const newCategory= new Category({title, description, picture});
            await newCategory.save();
            res.json({status: res.status, data: newCategory});
        } catch (error)  {
            console.log(error);
        } 
    }

    public async updateCategory(req: Request, res: Response): Promise<void>{
        try {
            const { id } = req.params;
            const category = await Category.findOneAndUpdate({_id: id}, req.body, {new:true});
            res.json({status: res.status, data: category});
        } catch (error)  {
            console.log(error);
        } 
    }

    public async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            await Category.findOneAndRemove({ _id: req.params.id });
            res.json({ response: 'Product deleted Successfully' });
        } catch (error)  {
            console.log(error);
        } 
    }

    public async productsByCategory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const products = await Product.find().where({'category':id});
            res.json({ products });
        } catch (error)  {
            console.log(error);
        } 
    }

    public async checkCategoryExist(req: Request, res: Response): Promise<any> {
        try {
            const category = await Category.findOne({ title: req.body.title });
            if (category) {
                return res.json({categoryExist: true});
            } else {
                return res.json({categoryExist: false});
            }
            
        } catch (error)  {
            console.log(error);
        }    
    }

    routes() {
        this.router.get('/', this.getCategories);
        this.router.get('/:id', this.getCategory);
        this.router.post('/', this.createCategory);
        this.router.put('/:id', this.updateCategory);
        this.router.delete('/:id', this.deleteCategory);
        this.router.get('/:id/products', this.productsByCategory);
        this.router.post('/checkCategory', this.checkCategoryExist);
    }
}

const categoryRoutes = new CategoryRouter();

export default categoryRoutes.router;