import {PrismaClient} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
    const passwordAdmin = await bcrypt.hash('AdminUser', roundsOfHashing);

    // création users
    const userAdmin = await prisma.user.upsert({
        where: {email: 'admin@admin.com'},
        update: {
            password: passwordAdmin,
        },
        create: {
            email: 'admin@admin.com',
            firstname: 'kantin',
            lastname: 'fagniart',
            role: "admin",
            password: passwordAdmin,
        },
    });

    // création catégorie
    const spiritueux = await prisma.category.upsert({
        where: { name: 'Spiritueux' },
        update: {},
        create: {
            name: 'Spiritueux',
            description: 'Cocktails spiritueux',
        },
    });
    const shooters = await prisma.category.upsert({
        where: { name: 'Shooters' },
        update: {},
        create: {
            name: 'Shooters',
            description: 'Cocktails shooters',
        },
    })
    const longDrink = await prisma.category.upsert({
        where: { name: 'Long drink' },
        update: {},
        create: {
            name: 'Long drink',
            description: 'Cocktails longDrink',
        },
    })
    const shortDrink = await prisma.category.upsert({
        where: { name: 'Short drink' },
        update: {},
        create: {
            name: 'Short drink',
            description: 'Cocktails shortDrink',
        },
    })
    const soft = await prisma.category.upsert({
        where: { name: 'Soft' },
        update: {},
        create: {
            name: 'Soft',
            description: 'Cocktails soft',
        }
    })
    const cocktail = await prisma.category.upsert({
        where: { name: 'Cocktail' },
        update: {},
        create: {
            name: 'Cocktail',
            description: 'Cocktails'
        }
    })
    const mocktail = await prisma.category.upsert({
        where: { name: 'Mocktail' },
        update: {},
        create: {
            name: 'Mocktail',
            description: 'Cocktails sans alcool'
        }
    })

    // création ingrédients
    const rhum = await prisma.ingredient.upsert({
        where: {name: 'Rhum'},
        update: {},
        create: {
            name: 'Rhum',
            quantity: 1000,
            unit: 'ml',
        },
    });
    const vodka = await prisma.ingredient.upsert({
        where: {name: 'Vodka'},
        update: {},
        create: {
            name: 'Vodka',
            quantity: 500,
            unit: 'ml',
        },
    });
    const menthe = await prisma.ingredient.upsert({
        where: {name: 'Menthe'},
        update: {},
        create: {
            name: 'Menthe',
            quantity: 1000,
            unit: 'g',
        },
    });

    // création articles
    const article = await prisma.article.create({
        data: {
            title: 'Mojito',
            description: 'Un cocktail rafraîchissant.',
            price: 100,
            categoryId: 1,
            published: true,
            ingredients: {
                create: [
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'Rhum'},
                                create: {name: 'Rhum', unit: 'ml', quantity: 1000},
                            },
                        },
                        quantity: 5,
                    },
                    {
                        ingredient: {
                            connectOrCreate: {
                                where: {name: 'Menthe'},
                                create: {name: 'Menthe', unit: 'g', quantity: 1000},
                            },
                        },
                        quantity: 1,
                    },
                ],
            },
        },
    });

    // création commandes
    const order = await prisma.order.create({
        data: {
            email: 'client@client.com',
            token: 'ziubufaifozad12ISUisubz',
            status: 'pending',
            paid: false,
            articles: {
                create: [
                    {
                        articleId: article.id,
                        articlePrice: article.price,
                        quantity: 1,
                    },
                ],
            },
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });