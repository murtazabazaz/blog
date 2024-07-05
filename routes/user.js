import express from 'express';
import { loginUser, registerUser } from '../controller/user.js';
import multer from "multer";
import { body } from 'express-validator';
import { signUpValidation, signinValidation } from '../middlewares/validation.js';

const isEmail = () => body('email').isEmail().withMessage('Please provide a valid email')

const upload = multer({dest : 'user/pics/'})
const router = express.Router();

router.post('/register',upload.single('profilePic'), signUpValidation, registerUser);

router.post('/login', signinValidation, loginUser)

export default router;