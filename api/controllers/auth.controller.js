import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
// import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    //req is the data from client side
    //res is the response from server side to client side
    const { username, email, password } = req.body;//get the data from client side
    const hashedPassword = bcrypt.hashSync(password, 10);//hash the password
    const newUser = new User({ username, email, password: hashedPassword });//create a new user
    try {
        await newUser.save()//save the new user to database
        res.status(201).json(newUser);//send the new user to client side
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error);
        // next(errorHandler(500, 'something went wrong'));
    }

}