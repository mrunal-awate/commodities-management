const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.createMany({
    data: [
      {
        email: 'manager@test.com',
        password: hashedPassword,
        role: 'MANAGER',
      },
      {
        email: 'store@test.com',
        password: hashedPassword,
        role: 'STORE_KEEPER',
      },
    ],
  });

  console.log('✅ Users seeded');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
