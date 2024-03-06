// src/services/authService.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'your_secret_key';

export const registerUser = async (username: string, email: string, password: string): Promise<void> => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({ data: { username, email, password: hashedPassword } });
};

export const loginUser = async (email: string, password: string): Promise<string> => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid credentials');
    }

    return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
};

export const logoutUser = async (): Promise<string> => {
    return 'User logged out successfully';
};
