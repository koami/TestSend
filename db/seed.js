import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const { shipment: Shipment } = prisma;

async function main() {}
main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
