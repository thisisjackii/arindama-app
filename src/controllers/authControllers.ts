// src/controllers/authController.ts
import { Request, Response } from 'express';
import * as authService from '../services/authServices';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, username, email, password, birthdate } = req.body;

  try {
    const regist = await authService.registerUser(name, username, email, password, birthdate);
    res.status(201).json({ message: regist });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { identifier, password } = req.body;

  try {
    const token = await authService.loginUser(identifier.includes('@') ? 'email' : 'username', identifier, password);
    res.json({ message: 'User logged in successfully', token });
  } catch (error: any) {
    console.error('Error logging in user:', error);
    res.status(401).json({ error: error.message });
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await authService.logoutUser();
    res.json({ message });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
