import express from "express"
import { connectDb } from "./utils/db.js";
import UserRoutes from "./routes/user.js"
import blogRoutes from "./routes/blog.js"
import {logger} from './utils/logger.js'

const app = express();
const port = 3001;

app.use(express.json());

app.use(express.urlencoded({extended:true}));

connectDb();

app.use('/api/v1', UserRoutes);

app.use('/api/v1', blogRoutes);


app.listen(port, ()=>{
    logger.info(`Server is running on port ${port}`);
});