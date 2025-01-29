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
    where: { name: 'Spiritueux' },
    update: {},
    create: {
      name: 'Spiritueux',
      description: 'Cocktails spiritueux',
    },
  });
  await prisma.category.upsert({
    where: { name: 'Shooters' },
    update: {},
    create: {
      name: 'Shooters',
      description: 'Cocktails shooters',
    },
  });
  await prisma.category.upsert({
    where: { name: 'Long drink' },
    update: {},
    create: {
      name: 'Long drink',
      description: 'Cocktails longDrink',
    },
  });
  await prisma.category.upsert({
    where: { name: 'Short drink' },
    update: {},
    create: {
      name: 'Short drink',
      description: 'Cocktails shortDrink',
    },
  });
  await prisma.category.upsert({
    where: { name: 'Soft' },
    update: {},
    create: {
      name: 'Soft',
      description: 'Cocktails soft',
    },
  });
  await prisma.category.upsert({
    where: { name: 'Cocktail' },
    update: {},
    create: {
      name: 'Cocktail',
      description: 'Cocktails',
    },
  });
  await prisma.category.upsert({
    where: { name: 'Mocktail' },
    update: {},
    create: {
      name: 'Mocktail',
      description: 'Cocktails sans alcool',
    },
  });

  // création ingrédients
  await prisma.ingredient.upsert({
    where: { name: 'Rhum' },
    update: {},
    create: {
      name: 'Rhum',
      quantity: 1000,
      unit: 'ml',
    },
  });
  await prisma.ingredient.upsert({
    where: { name: 'Vodka' },
    update: {},
    create: {
      name: 'Vodka',
      quantity: 500,
      unit: 'ml',
    },
  });
  await prisma.ingredient.upsert({
    where: { name: 'Menthe' },
    update: {},
    create: {
      name: 'Menthe',
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
