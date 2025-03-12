import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordAdmin = await bcrypt.hash('AdminUser', 10);

  // création users
  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {
      password: passwordAdmin,
    },
    create: {
      email: 'admin@admin.com',
      firstname: 'kantin',
      lastname: 'fagniart',
      role: 'admin',
      password: passwordAdmin,
    },
  });

  // création catégorie
  await prisma.category.upsert({
    where: { name: 'spiritueux' },
    update: {},
    create: {
      name: 'spiritueux',
      description: 'Cocktails spiritueux',
    },
  });
  await prisma.category.upsert({
    where: { name: 'shooter' },
    update: {},
    create: {
      name: 'shooter',
      description: 'Cocktails shooters',
    },
  });
  await prisma.category.upsert({
    where: { name: 'long-drink' },
    update: {},
    create: {
      name: 'long-drink',
      description: 'Cocktails longDrink',
    },
  });
  await prisma.category.upsert({
    where: { name: 'short-drink' },
    update: {},
    create: {
      name: 'short-drink',
      description: 'Cocktails shortDrink',
    },
  });
  await prisma.category.upsert({
    where: { name: 'soft' },
    update: {},
    create: {
      name: 'soft',
      description: 'Cocktails soft',
    },
  });
  await prisma.category.upsert({
    where: { name: 'cocktail' },
    update: {},
    create: {
      name: 'cocktail',
      description: 'Cocktails',
    },
  });
  await prisma.category.upsert({
    where: { name: 'indemodables' },
    update: {},
    create: {
      name: 'indemodables',
      description: 'indemodables',
    },
  });
  await prisma.category.upsert({
    where: { name: 'mocktail' },
    update: {},
    create: {
      name: 'mocktail',
      description: 'Cocktails sans alcool',
    },
  });

  // création ingrédients
  await prisma.ingredient.upsert({
    where: { name: 'rhum' },
    update: {},
    create: {
      name: 'rhum',
      quantity: 1000,
      unit: 'ml',
    },
  });
  await prisma.ingredient.upsert({
    where: { name: 'vodka' },
    update: {},
    create: {
      name: 'vodka',
      quantity: 500,
      unit: 'ml',
    },
  });
  await prisma.ingredient.upsert({
    where: { name: 'menthe' },
    update: {},
    create: {
      name: 'menthe',
      quantity: 1000,
      unit: 'g',
    },
  });

  // création articles
  const Mojito = await prisma.article.create({
    data: {
      title: 'Mojito',
      description: 'Un cocktail rafraîchissant.',
      price: 11.3,
      imagePath: 'mojito.jpg',
      categoryId: 6,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Rhum' },
                create: { name: 'Rhum', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 5,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Menthe' },
                create: { name: 'Menthe', unit: 'g', quantity: 1000 },
              },
            },
            quantity: 1,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Pina Colada',
      description: 'Un cocktail classique et exotique.',
      price: 12.5,
      imagePath: 'pinaColada.jpg',
      categoryId: 6,
      published: false,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Rhum' },
                create: { name: 'Rhum', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 6,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Jus d\'ananas' },
                create: { name: 'Jus d\'ananas', unit: 'ml', quantity: 1500 },
              },
            },
            quantity: 10,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Lait de coco' },
                create: { name: 'Lait de coco', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 4,
          },
        ],
      },
    },
  });

  // création commandes
  await prisma.order.create({
    data: {
      email: 'client@client.com',
      token: 'ziubufaifozad12ISUisubz',
      status: 'pending',
      paid: false,
      articles: {
        create: [
          {
            articleId: Mojito.id,
            articlePrice: Mojito.price,
            quantity: 1,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seeding completed!');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
