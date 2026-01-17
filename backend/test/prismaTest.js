const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function main() {
  // Create a product
  const product = await prisma.product.create({
    data: {
      name: "Test Product",
      quantity: 10,
      price: 99.99,
    },
  });

  console.log("Created product:", product);

  // Read all products
  const products = await prisma.product.findMany();
  console.log("All products:", products);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
