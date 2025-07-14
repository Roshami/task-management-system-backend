import express from 'express';
import {
  deleteUser,
  getUsers,
  loginUser,
  registerUser,
  resetPassword,
  sendOTP,
  updateUser,
  verifyOTP,
} from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.post('/register', registerUser);
usersRouter.post('/', loginUser);
usersRouter.get('/', getUsers);
usersRouter.put('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.get('/sendOTP', sendOTP);
usersRouter.post('/verifyEmail', verifyOTP);
usersRouter.post('/resetPassword', resetPassword);

export default usersRouter;
