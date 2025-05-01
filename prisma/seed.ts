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
  // 3 cocktails supplémentaires pour la catégorie "spiritueux" (categoryId: 1)
  const mint_julep = await prisma.article.create({
    data: {
      title: 'Mint Julep',
      description:
        'Un cocktail rafraîchissant à base de bourbon, sucre et menthe, traditionnellement servi lors du Kentucky Derby.',
      price: 10.0,
      imagePath: '/uploads/articles/mint_julep.jpg',
      categoryId: 1,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Bourbon' },
                create: { name: 'Bourbon', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 60,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Sirop de sucre' },
                create: { name: 'Sirop de sucre', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 15,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Menthe' },
                create: { name: 'Menthe', unit: 'g', quantity: 1000 },
              },
            },
            quantity: 8,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Gibson',
      description:
        "Une variation du Martini classique, servie avec un oignon cocktail au lieu d'une olive.",
      price: 12.5,
      imagePath: '/uploads/articles/gibson.jpg',
      categoryId: 1,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Gin' },
                create: { name: 'Gin', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 75,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Vermouth sec' },
                create: { name: 'Vermouth sec', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 15,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Oignon cocktail' },
                create: {
                  name: 'Oignon cocktail',
                  unit: 'unité',
                  quantity: 100,
                },
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
      title: 'Aviation',
      description:
        'Un cocktail classique à la couleur bleu-violet, à base de gin, marasquin et violette.',
      price: 13.0,
      imagePath: '/uploads/articles/aviation.avif',
      categoryId: 1,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Gin' },
                create: { name: 'Gin', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 45,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Liqueur de marasquin' },
                create: {
                  name: 'Liqueur de marasquin',
                  unit: 'ml',
                  quantity: 700,
                },
              },
            },
            quantity: 15,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Crème de violette' },
                create: {
                  name: 'Crème de violette',
                  unit: 'ml',
                  quantity: 700,
                },
              },
            },
            quantity: 10,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Jus de citron' },
                create: { name: 'Jus de citron', unit: 'ml', quantity: 500 },
              },
            },
            quantity: 15,
          },
        ],
      },
    },
  });

  // 3 cocktails supplémentaires pour la catégorie "shooter" (categoryId: 2)
  await prisma.article.create({
    data: {
      title: 'Baby Guinness',
      description:
        "Un shooter qui ressemble à une mini pinte de Guinness, avec du Kahlúa et de la crème de Bailey's.",
      price: 7.0,
      imagePath: '/uploads/articles/baby_guinness.avif',
      categoryId: 2,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Kahlúa' },
                create: { name: 'Kahlúa', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 30,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Baileys' },
                create: { name: 'Baileys', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 15,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Flaming B-52',
      description: 'Une version flambée du shooter B-52 traditionnel.',
      price: 8.5,
      imagePath: '/uploads/articles/flaming_b52.jpg',
      categoryId: 2,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Kahlúa' },
                create: { name: 'Kahlúa', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 20,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Baileys' },
                create: { name: 'Baileys', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 20,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Grand Marnier' },
                create: { name: 'Grand Marnier', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 20,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Alcool à brûler' },
                create: { name: 'Alcool à brûler', unit: 'ml', quantity: 200 },
              },
            },
            quantity: 5,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Orgasm',
      description: 'Un shooter doux et crémeux à base de liqueurs.',
      price: 7.0,
      imagePath: '/uploads/articles/orgasm.jpg',
      categoryId: 2,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Amaretto' },
                create: { name: 'Amaretto', unit: 'ml', quantity: 500 },
              },
            },
            quantity: 15,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Baileys' },
                create: { name: 'Baileys', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 15,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Kahlúa' },
                create: { name: 'Kahlúa', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 15,
          },
        ],
      },
    },
  });

  // 3 cocktails supplémentaires pour "long-drink" (categoryId: 3)
  await prisma.article.create({
    data: {
      title: 'Moscow Mule',
      description:
        'Un cocktail rafraîchissant à base de vodka, ginger beer et citron vert, traditionnellement servi dans une tasse en cuivre.',
      price: 10.5,
      imagePath: '/uploads/articles/moscow_mule.avif',
      categoryId: 3,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Vodka' },
                create: { name: 'Vodka', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 50,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Ginger Beer' },
                create: { name: 'Ginger Beer', unit: 'ml', quantity: 330 },
              },
            },
            quantity: 120,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Jus de citron vert' },
                create: {
                  name: 'Jus de citron vert',
                  unit: 'ml',
                  quantity: 500,
                },
              },
            },
            quantity: 10,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: "Dark 'n' Stormy",
      description:
        'Un cocktail corsé à base de rhum brun et ginger beer, originaire des Bermudes.',
      price: 9.5,
      imagePath: '/uploads/articles/dark_n_stormy.png',
      categoryId: 3,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Rhum ambré' },
                create: { name: 'Rhum ambré', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 60,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Ginger Beer' },
                create: { name: 'Ginger Beer', unit: 'ml', quantity: 330 },
              },
            },
            quantity: 120,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Citron vert' },
                create: { name: 'Citron vert', unit: 'unité', quantity: 50 },
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
      title: 'Paloma',
      description:
        'Un cocktail mexicain rafraîchissant à base de tequila et soda pamplemousse.',
      price: 9.0,
      imagePath: '/uploads/articles/paloma.jpg',
      categoryId: 3,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Tequila' },
                create: { name: 'Tequila', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 50,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Soda pamplemousse' },
                create: {
                  name: 'Soda pamplemousse',
                  unit: 'ml',
                  quantity: 330,
                },
              },
            },
            quantity: 150,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Jus de citron vert' },
                create: {
                  name: 'Jus de citron vert',
                  unit: 'ml',
                  quantity: 500,
                },
              },
            },
            quantity: 15,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Sel' },
                create: { name: 'Sel', unit: 'g', quantity: 250 },
              },
            },
            quantity: 1,
          },
        ],
      },
    },
  });

  // 3 cocktails supplémentaires pour "short-drink" (categoryId: 4)
  await prisma.article.create({
    data: {
      title: 'Sidecar',
      description:
        'Un cocktail classique à base de cognac, triple sec et jus de citron.',
      price: 11.0,
      imagePath: '/uploads/articles/sidecar.webp',
      categoryId: 4,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Cognac' },
                create: { name: 'Cognac', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 50,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Triple Sec' },
                create: { name: 'Triple Sec', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 20,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Jus de citron' },
                create: { name: 'Jus de citron', unit: 'ml', quantity: 500 },
              },
            },
            quantity: 20,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Gimlet',
      description:
        'Un cocktail classique et rafraîchissant à base de gin et jus de citron vert.',
      price: 9.5,
      imagePath: '/uploads/articles/gimlet.webp',
      categoryId: 4,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Gin' },
                create: { name: 'Gin', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 60,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Cordial de citron vert' },
                create: {
                  name: 'Cordial de citron vert',
                  unit: 'ml',
                  quantity: 750,
                },
              },
            },
            quantity: 15,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Espresso Martini',
      description:
        'Un cocktail énergisant à base de vodka, liqueur de café et espresso frais.',
      price: 11.5,
      imagePath: '/uploads/articles/espresso_martini.avif',
      categoryId: 4,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Vodka' },
                create: { name: 'Vodka', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 50,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Kahlúa' },
                create: { name: 'Kahlúa', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 20,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Espresso' },
                create: { name: 'Espresso', unit: 'ml', quantity: 250 },
              },
            },
            quantity: 30,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Sirop de sucre' },
                create: { name: 'Sirop de sucre', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 10,
          },
        ],
      },
    },
  });

  // 3 cocktails supplémentaires pour "soft" (categoryId: 5)
  await prisma.article.create({
    data: {
      title: 'Citron Frappé',
      description:
        'Une boisson fraîche et citronnée, idéale pour les journées chaudes.',
      price: 6.0,
      imagePath: '/uploads/articles/citron_frappe.avif',
      categoryId: 5,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Jus de citron' },
                create: { name: 'Jus de citron', unit: 'ml', quantity: 500 },
              },
            },
            quantity: 30,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Sirop de sucre' },
                create: { name: 'Sirop de sucre', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 20,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Eau gazeuse' },
                create: { name: 'Eau gazeuse', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 150,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Menthe' },
                create: { name: 'Menthe', unit: 'g', quantity: 1000 },
              },
            },
            quantity: 5,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Arnold Palmer',
      description: 'Un mélange rafraîchissant de thé glacé et de limonade.',
      price: 6.5,
      imagePath: '/uploads/articles/arnold_palmer.jpg',
      categoryId: 5,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Thé glacé' },
                create: { name: 'Thé glacé', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 100,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Limonade' },
                create: { name: 'Limonade', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 100,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Citron' },
                create: { name: 'Citron', unit: 'unité', quantity: 50 },
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
      title: 'Sangria Sans Alcool',
      description:
        'Une version sans alcool de la célèbre boisson espagnole, pleine de fruits frais.',
      price: 7.5,
      imagePath: '/uploads/articles/sangria_sans_alcool.jpg',
      categoryId: 5,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Jus de raisin rouge' },
                create: {
                  name: 'Jus de raisin rouge',
                  unit: 'ml',
                  quantity: 1000,
                },
              },
            },
            quantity: 150,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "Jus d'orange" },
                create: { name: "Jus d'orange", unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 50,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Fruits frais (mélange)' },
                create: {
                  name: 'Fruits frais (mélange)',
                  unit: 'g',
                  quantity: 500,
                },
              },
            },
            quantity: 100,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Cannelle' },
                create: { name: 'Cannelle', unit: 'g', quantity: 100 },
              },
            },
            quantity: 1,
          },
        ],
      },
    },
  });

  // 3 cocktails supplémentaires pour "cocktail" (categoryId: 6)
  await prisma.article.create({
    data: {
      title: 'Mai Tai',
      description:
        'Un cocktail tropical à base de rhum, curaçao et jus de lime.',
      price: 11.0,
      imagePath: '/uploads/articles/mai_tai.jpg',
      categoryId: 6,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Rhum blanc' },
                create: { name: 'Rhum blanc', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 30,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Rhum ambré' },
                create: { name: 'Rhum ambré', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 30,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Curaçao orange' },
                create: { name: 'Curaçao orange', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 15,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "Sirop d'orgeat" },
                create: { name: "Sirop d'orgeat", unit: 'ml', quantity: 750 },
              },
            },
            quantity: 15,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Jus de citron vert' },
                create: {
                  name: 'Jus de citron vert',
                  unit: 'ml',
                  quantity: 500,
                },
              },
            },
            quantity: 15,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Tequila Sunrise',
      description:
        "Un cocktail coloré à base de tequila, jus d'orange et grenadine.",
      price: 9.5,
      imagePath: '/uploads/articles/tequila_sunrise.jpg',
      categoryId: 6,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Tequila' },
                create: { name: 'Tequila', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 45,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "Jus d'orange" },
                create: { name: "Jus d'orange", unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 90,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Sirop de grenadine' },
                create: {
                  name: 'Sirop de grenadine',
                  unit: 'ml',
                  quantity: 500,
                },
              },
            },
            quantity: 15,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Singapore Sling',
      description:
        'Un cocktail exotique à base de gin, créé au Raffles Hotel de Singapour.',
      price: 12.5,
      imagePath: '/uploads/articles/singapore_sling.jpg',
      categoryId: 6,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Gin' },
                create: { name: 'Gin', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 30,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Cherry Brandy' },
                create: { name: 'Cherry Brandy', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 15,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Cointreau' },
                create: { name: 'Cointreau', unit: 'ml', quantity: 700 },
              },
            },
            quantity: 7.5,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'DOM Bénédictine' },
                create: { name: 'DOM Bénédictine', unit: 'ml', quantity: 700 },
              },
            },
            quantity: 7.5,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "Jus d'ananas" },
                create: { name: "Jus d'ananas", unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 120,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Jus de citron' },
                create: { name: 'Jus de citron', unit: 'ml', quantity: 500 },
              },
            },
            quantity: 15,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Angostura bitters' },
                create: {
                  name: 'Angostura bitters',
                  unit: 'ml',
                  quantity: 100,
                },
              },
            },
            quantity: 1,
          },
        ],
      },
    },
  });

  // 3 cocktails supplémentaires pour "indemodables" (categoryId: 7)
  await prisma.article.create({
    data: {
      title: 'Pisco Sour',
      description:
        "Le cocktail national du Pérou et du Chili, à base de pisco, citron vert et blanc d'œuf.",
      price: 10.5,
      imagePath: '/uploads/articles/pisco_sour.jpg',
      categoryId: 7,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Pisco' },
                create: { name: 'Pisco', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 60,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Jus de citron vert' },
                create: {
                  name: 'Jus de citron vert',
                  unit: 'ml',
                  quantity: 500,
                },
              },
            },
            quantity: 30,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Sirop de sucre' },
                create: { name: 'Sirop de sucre', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 20,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "Blanc d'œuf" },
                create: { name: "Blanc d'œuf", unit: 'ml', quantity: 250 },
              },
            },
            quantity: 20,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Angostura bitters' },
                create: {
                  name: 'Angostura bitters',
                  unit: 'ml',
                  quantity: 100,
                },
              },
            },
            quantity: 2,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Aperol Spritz',
      description:
        'Un apéritif italien classique, pétillant et légèrement amer.',
      price: 9.0,
      imagePath: '/uploads/articles/aperol_spritz.jpg',
      categoryId: 7,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Aperol' },
                create: { name: 'Aperol', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 60,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Prosecco' },
                create: { name: 'Prosecco', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 90,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Eau gazeuse' },
                create: { name: 'Eau gazeuse', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 30,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Orange' },
                create: { name: 'Orange', unit: 'unité', quantity: 25 },
              },
            },
            quantity: 0.25,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Tom Collins',
      description:
        'Un cocktail classique rafraîchissant à base de gin, jus de citron et soda.',
      price: 9.5,
      imagePath: '/uploads/articles/tom_collins.jpg',
      categoryId: 7,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Gin' },
                create: { name: 'Gin', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 45,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Jus de citron' },
                create: { name: 'Jus de citron', unit: 'ml', quantity: 500 },
              },
            },
            quantity: 30,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Sirop de sucre' },
                create: { name: 'Sirop de sucre', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 15,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Eau gazeuse' },
                create: { name: 'Eau gazeuse', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 60,
          },
        ],
      },
    },
  });

  // 3 cocktails supplémentaires pour "mocktail" (categoryId: 8)
  await prisma.article.create({
    data: {
      title: 'Virgin Mojito Fraise',
      description:
        'Une version fruitée du Virgin Mojito, avec des fraises fraîches.',
      price: 7.5,
      imagePath: '/uploads/articles/virgin_mojito_fraise.jpg',
      categoryId: 8,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Fraises' },
                create: { name: 'Fraises', unit: 'g', quantity: 500 },
              },
            },
            quantity: 60,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Menthe' },
                create: { name: 'Menthe', unit: 'g', quantity: 1000 },
              },
            },
            quantity: 10,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Citron vert' },
                create: { name: 'Citron vert', unit: 'unité', quantity: 50 },
              },
            },
            quantity: 1,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Sirop de sucre' },
                create: { name: 'Sirop de sucre', unit: 'ml', quantity: 750 },
              },
            },
            quantity: 20,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Eau gazeuse' },
                create: { name: 'Eau gazeuse', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 100,
          },
        ],
      },
    },
  });

  await prisma.article.create({
    data: {
      title: 'Blue Lagoon Sans Alcool',
      description:
        'Une version sans alcool du Blue Lagoon, tout aussi bleue et rafraîchissante.',
      price: 7.0,
      imagePath: '/uploads/articles/blue_lagoon_sans_alcool.webp',
      categoryId: 8,
      published: true,
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Sirop de curaçao bleu sans alcool' },
                create: {
                  name: 'Sirop de curaçao bleu sans alcool',
                  unit: 'ml',
                  quantity: 750,
                },
              },
            },
            quantity: 30,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Jus de citron' },
                create: { name: 'Jus de citron', unit: 'ml', quantity: 500 },
              },
            },
            quantity: 20,
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: 'Limonade' },
                create: { name: 'Limonade', unit: 'ml', quantity: 1000 },
              },
            },
            quantity: 150,
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
      phone: '0123456789',
      table: 1,
      status: 'pending',
      paid: false,
      articles: {
        create: [
          {
            articleId: mint_julep.id,
            articlePrice: mint_julep.price,
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
