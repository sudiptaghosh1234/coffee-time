const express= require( 'express');
const dotenv = require( 'dotenv');
import UserRouter from "./routes/UserRouter.route";
import OrderRouter from "./routes/OrderRouter.route";
import ProductRouter from "./routes/ProductRouter.route";
import cors from 'cors';

dotenv.config();
const app=express();


app.use(express.json());
app.use(cors());

app.use("/api/user", UserRouter);
app.use("/api/order", OrderRouter);
app.use("/api/product", ProductRouter);

const PORT=process.env.PORT || 4000;


app.listen(PORT, ()=>{console.log(`Server is listening on port ${PORT}`)});