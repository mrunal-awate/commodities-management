const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Prisma test started');

  const product = await prisma.product.create({
    data: {
      name: 'Test Product',
      quantity: 10,
      price: 99.99,
    },
  });

  console.log('✅ Created product:', product);

  const products = await prisma.product.findMany();
  console.log('📦 All products:', products);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Prisma disconnected');
  });
