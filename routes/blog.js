import express from 'express';
import {isAuthenticated} from "../middlewares/auth.js"
import { createBlog, deleteBlog, updateBlog, getAllBlogs, getBlog } from '../controller/blog.js';
import multer from 'multer';
import { blogValidation } from '../middlewares/validation.js';

const upload = multer({ dest: 'blog/pic/' })
const router = express.Router();
import { body } from 'express-validator';


router.post("/createBlog", isAuthenticated,upload.single('imageUrl'),blogValidation, createBlog);

router.get("/blog",  getAllBlogs);

router.get("/:id", getBlog)

router.delete("/:id", isAuthenticated, deleteBlog)

router.put("/:id", isAuthenticated, blogValidation, updateBlog);




export default router;