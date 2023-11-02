import User from "../models/User.js";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/error.js";

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

// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) return next(createError(404, "User not Found!"));

//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordCorrect)
//       return next(createError(400, "Email or Password Incorrect!"));

//     res.status(200).send(user);
//   } catch (error) {
//     next(error);
//   }
// };

// Old Login

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not Found!"));

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_KEY
    );

    const orignalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    // output pass to console
    console.log(orignalPassword);
    if (orignalPassword !== req.body.password)
      return next(createError(400, "Email or Password Incorrect!"));

    // json web token
    // const accessToken = jwt.sign(
    //   {
    //     id: user._id,
    //     isAdmin: user.isAdmin,
    //   },
    //   process.env.JWT_KEY,
    //   { expiresIn: "7d" }
    // );

    const { password, ...others } = user._doc;
    // res.status(200).send({ ...others, accessToken });
    // Updated output
    res.status(200).send({ ...others });
  } catch (error) {
    res.status(400).send(error);
  }
};
