import {check} from 'express-validator'

export const signinValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]
export const signUpValidation = [
    check('fName','Enter first name').notEmpty(),
    check('lName','Enter last name').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]

export const blogValidation = [
    check('title', 'Enter title of the blog').notEmpty(),
    check('content', 'Enter content of the blog').notEmpty(),
    check('imageUrl').optional()

]