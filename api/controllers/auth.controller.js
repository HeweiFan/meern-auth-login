import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(400, 'Wrong password'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
          .status(200)
          .json(rest);
    } catch (error) {
        next(error);
    }

}
