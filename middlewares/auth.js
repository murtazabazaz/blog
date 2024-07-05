import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const isAuthenticated = async(req, res, next) => {
    try {
        const token  = req.headers['authorization'];

        if(!token){
            return res.status(401).json({message: "no token provided"});
        }
        const decoded = await jwt.verify(token, 'mysecret');
        console.log(decoded);

        const user = await User.findById({_id:decoded._id});

        req.user = {
            _id: user._id,
            firstName: user.fName,
            lastName: user.lName,
            email: user.email
        }
        next();


    } catch (error) {
        return res.status(401).json({ message: 'No token provided' });
    }
}