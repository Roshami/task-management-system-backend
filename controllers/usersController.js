import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/users.js';

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
