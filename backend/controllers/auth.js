import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_KEY
    ).toString(),
  });

  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (error) {
    next(error);
  }
};

// Login User

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("email or password incorrect!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_KEY
    );

    const orignalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (orignalPassword !== req.body.password)
      return res.status(400).send("email or password incorrect!");

    // json web token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(400).send(error);
  }
};
