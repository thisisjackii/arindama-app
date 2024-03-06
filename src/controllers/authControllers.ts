// src/controllers/authController.ts
import { Request, Response } from 'express';
import * as authService from '../services/authServices';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    await authService.registerUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(401).json({ error: error });
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
