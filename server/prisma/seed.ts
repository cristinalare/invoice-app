import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const HASH_COST = 8;
async function main() {
  const testPassword = 'postgres';
  const hashedPassword = await bcrypt.hash(testPassword, HASH_COST);

  const user1 = await prisma.user.create({
    data: {
      email: 'johndoe@gmail.com',
      password: hashedPassword,
      name: 'John Doe',
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: 'user2@gmail.com',
      password: hashedPassword,
      name: 'Test User',
    },
  });

  await prisma.invoice.createMany({
    data: [
      {
        userId: user1.id,
        vendorName: 'Amazon',
        amount: 219.99,
        dueDate: new Date('2025-06-10'),
        description: 'Test description',
      },
      {
        userId: user1.id,
        vendorName: 'Sysco',
        amount: 2228.75,
        dueDate: new Date('2025-11-10'),
        description: 'Test description2',
        paid: true,
      },
      {
        userId: user1.id,
        vendorName: 'US Foods',
        amount: 428,
        dueDate: new Date('2025-12-04'),
        description: 'Test description3',
        paid: false,
      },
      {
        userId: user1.id,
        vendorName: 'US Foods',
        amount: 2655,
        dueDate: new Date('2025-06-16'),
        description: 'Test description',
      },
      {
        userId: user1.id,
        vendorName: 'Ikea',
        amount: 854,
        dueDate: new Date('2025-11-10'),
        description: 'Test description2',
        paid: true,
      },
      {
        userId: user1.id,
        vendorName: 'US Foods',
        amount: 428,
        dueDate: new Date('2025-12-01'),
        description: 'Test description3',
        paid: true,
      },
      {
        userId: user1.id,
        vendorName: 'Ikea',
        amount: 219.5,
        dueDate: new Date('2025-06-11'),
        description: 'Test description',
      },
      {
        userId: user1.id,
        vendorName: 'Sysco',
        amount: 2228.75,
        dueDate: new Date('2025-11-10'),
        description: 'Test description2',
        paid: true,
      },
      {
        userId: user1.id,
        vendorName: 'US Foods',
        amount: 428,
        dueDate: new Date('2025-12-04'),
        description: 'Test description3',
        paid: false,
      },
      {
        userId: user1.id,
        vendorName: 'Amazon',
        amount: 219.99,
        dueDate: new Date('2025-06-10'),
        description: 'Test description',
      },
      {
        userId: user1.id,
        vendorName: 'Sysco',
        amount: 123.75,
        dueDate: new Date('2025-11-10'),
        description: 'Test description2',
        paid: true,
      },
      {
        userId: user1.id,
        vendorName: 'Sysco',
        amount: 87,
        dueDate: new Date('2025-12-04'),
        description: 'Test description3',
        paid: false,
      },
      {
        userId: user2.id,
        vendorName: 'Ikea',
        amount: 48,
        dueDate: new Date('2025-12-07'),
        description: 'Test description4',
        paid: false,
      },
    ],
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
