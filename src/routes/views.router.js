import { Router, json } from "express";
import productManager from "../productManager.js";

const item = new productManager();

const viewsRouter = Router();

viewsRouter.get("/", async(req,res)=>{
    const prods =await item.getProducts();
    console.log(prods);
    res.render("home",{prods});
})

viewsRouter.get('/realTimeProducts', (req,res)=>{
    res.render('realTimeProducts');
})

export default viewsRouter;