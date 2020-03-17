import { Router, Request, Response } from 'express';

import Category from '../models/Category';

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
            const category = await Category.find({ title: { $regex: req.params.title } });
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
            const { title } = req.params;
            const category = await Category.findOneAndUpdate({title}, req.body);
            res.json({status: res.status, data: category});
        } catch (error)  {
            console.log(error);
        } 
    }

    public async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            await Category.findOneAndRemove({ title: req.params.title });
            res.json({ response: 'Product deleted Successfully' });
        } catch (error)  {
            console.log(error);
        } 
    }

    routes() {
        this.router.get('/', this.getCategories);
        this.router.get('/:title', this.getCategory);
        this.router.post('/', this.createCategory);
        this.router.put('/:title', this.updateCategory);
        this.router.delete('/:title', this.deleteCategory);
    }
}

const categoryRoutes = new CategoryRouter();

export default categoryRoutes.router;