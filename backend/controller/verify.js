import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req,res) =>{
    try{
        const {name,email,password} = req.body;
        // vaildate
        if(!name || !email || ! password){
            return res.status(400).json ({message:"ALL FIELDS ARE REQUIRED"});

        }
        //USER ALREADY EXIST
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"USER ALREADY EXIST"});

        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = await User.create({
            name,
            email,
            password:hashedPassword,

        });
        //responf
        res.status(201).json({
            message:"USER REGISTERED SUCCESSFULLY",
            user:{
                id: user._id,
                 name: user.name,
        email: user.email,
        role: user.role,
            },
        });
    }
     catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

///////// login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5. Response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // JWT is stateless → no server session to destroy
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};