import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

function getShelves() {
  return [
    {
      name: "Dairy",
      items: {
        create: [{ name: "Milk" }, { name: "Eggs" }, { name: "Cheese" }],
      },
    },
    {
      name: "Fruits",
      items: {
        create: [{ name: "Apples" }, { name: "Oranges" }, { name: "Banana" }],
      },
    },
  ];
}

async function seed() {
  await Promise.all(
    getShelves().map((shelf) => db.pantryShelf.create({ data: shelf }))
  );
}

seed();
