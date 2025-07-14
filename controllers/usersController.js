import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/users.js';
import OTP from '../models/otp.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'thashmantharoshami@gmail.com',
    pass: process.env.AUTH_EMAIL,
  },
});

export function registerUser(req, res) {
  const data = req.body;
  data.password = bcrypt.hashSync(data.password, 10);

  const newUser = new Users(data);

  newUser
    .save()
    .then(() => {
      res.json({
        message: 'User registered successfully',
      });
    })
    .catch((error) => {
      console.error('Error saving user:', error);
      res.status(500).json({
        message: 'User registration failed',
      });
    });
}

export function loginUser(req, res) {
  const data = req.body;
  const email = data.email;
  const password = data.password;
  Users.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: 'User not found' });
      } else {
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (isPasswordValid) {
          const token = jwt.sign(
            {
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              isPersonal: user.isPersonal,
              companyName: user.companyName,
            },
            process.env.JWT_SECRET
          );
          res.status(200).json({
            message: 'Login successful',
            token: token,
            user: user,
          });
          console.log(token);
        } else {
          res.status(401).json({ message: 'Invalid password' });
        }
      }
    })
    .catch((error) => {
      console.error('Error finding user:', error);
      res.status(500).json({ message: 'Error finding user' });
    });
}

export function getUsers(req, res) {
  console.log(req.user);
  const companyName = req.user.companyName;
  try {
    Users.find({ companyName: companyName, isAdmin: false, isPersonal: false })
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        console.error('Error finding users:', error);
        res.status(500).json({ message: 'Error finding users' });
      });
  } catch (error) {
    console.error('Error finding users:', error);
    res.status(500).json({ message: 'Error finding users' });
  }
}

export function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    Users.updateOne({ _id: userId }, updatedData, { new: true })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        } else {
          res.json(user);
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
      });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
}

export function deleteUser(req, res) {
  const userId = req.params.id;

  Users.deleteOne({ _id: userId })
    .then(() => {
      res.json({ message: 'User deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Error deleting user' });
    });
}

export async function sendOTP(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const newOTP = new OTP({
    email: req.user.email,
    otp: otp,
  });

  try {
    await newOTP.save();

    const message = {
      from: 'thashmantharoshami@gmail.com',
      to: req.user.email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`,
    };

    transport.sendMail(message, (error, info) => {
      if (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({ message: 'Error sending OTP' });
      } else {
        console.log('OTP sent successfully:', info.response);
        return res.status(200).json({ message: 'OTP sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error saving OTP:', error);
    return res.status(500).json({ message: 'Error saving OTP' });
  }
}

export async function verifyOTP(req, res) {
  if (req.user == null) {
    res.status(401).json({ message: 'User not found' });
  }

  const code = req.body.code;

  try {
    const otp = await OTP.findOne({
      email: req.user.email,
      otp: code,
    });

    if (otp == null) {
      res.status(401).json({ message: 'Invalid OTP' });
    } else {
      await OTP.deleteOne({ email: req.user.email });

      await Users.updateOne({ email: req.user.email }, { isVerified: true });
      res.status(200).json({ message: 'OTP verified successfully' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
}
