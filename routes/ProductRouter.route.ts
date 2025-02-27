import express from 'express'
import {createProduct} from '../controllers/Product.controller';
import { isAuthenticated, isAdmin } from '../middleware/auth';

const ProductRouter=express.Router();

ProductRouter.post("/create-product", isAuthenticated, isAdmin, createProduct);

export default ProductRouter;