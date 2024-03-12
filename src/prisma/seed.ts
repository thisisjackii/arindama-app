import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    try {
        const hashedPassword = await bcrypt.hash("password", 10);

        // Create or update users
        const alice = await prisma.user.upsert({
            where: { email: 'alice@example.com' },
            update: {},
            create: {
                email: 'alice@example.com',
                name: 'Alice',
                username: 'alicebotak',
                password: hashedPassword, // Add a password field
                birthdate: new Date('1995-05-15'), // Example birthdate
                emailVerified: true, // Example email verification status
                // Add other fields as needed
            },
        });

        const bob = await prisma.user.upsert({
            where: { email: 'bob@example.com' },
            update: {},
            create: {
                email: 'bob@example.com',
                name: 'Bob',
                username: 'bobgundul',
                password: hashedPassword, // Add a password field
                birthdate: new Date('1995-05-15'), // Example birthdate
                emailVerified: true, // Example email verification status
                // Add other fields as needed
            },
        });

        console.log({ alice, bob });
    } catch (error) {
        console.error('Error seeding users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
