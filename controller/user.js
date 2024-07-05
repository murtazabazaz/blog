import User from '../model/user.js'
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const registerUser = async (req, res) => {
    try {
      // signup validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
          console.log('result', result)
          return res.send(`Hello, ${result}!`);
        }


        const { fName, lName, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fName,
            lName,
            email,
            password: hashedPassword,
            profilePic : (req?.file?.originalname) ?  req.file.originalname : undefined
        });

        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

export const loginUser = async(req, res) => {
    try {
      const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log('result', result)
    return res.send(`Hello, ${result}!`);
  }
  // email validator...
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

        const {email, password} = req.body;

        if(!email || ! password){
            res.status(400).json({error: 'email and password invalid'});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({error: "Invalid creds"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(401).json({error: 'Invalid creds'});
         }

         const token = jwt.sign({_id : user._id}, 'mysecret', {expiresIn: '1h'});
         console.log("jwt token = ", token)

         return res.status(200).json({message: "login succesful"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}