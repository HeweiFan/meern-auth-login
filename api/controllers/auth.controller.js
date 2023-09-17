import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    //req is the data from client side
    //res is the response from server side to client side
    const { username, email, password } = req.body;//get the data from client side
    const hashedPassword = bcrypt.hashSync(password, 10);//hash the password
    const newUser = new User({ username, email, password: hashedPassword });//create a new user
    try {
        await newUser.save()//save the new user to database
        res.status(201).json(newUser);//send the new user to client side
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}