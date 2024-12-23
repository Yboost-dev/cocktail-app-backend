import {PrismaClient} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
    const passwordAdmin = await bcrypt.hash('AdminUser', roundsOfHashing);

    // Création ou mise à jour de l'utilisateur admin
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

    // Création ou mise à jour des ingrédients
    const rhum = await prisma.ingredient.upsert({
        where: { name: 'Rhum' },
        update: {},
        create: {
            name: 'Rhum',
            quantity: 1000, // 1000 ml
            unit: 'ml',     // Unité
        },
    });

    const vodka = await prisma.ingredient.upsert({
        where: { name: 'Vodka' },
        update: {},
        create: {
            name: 'Vodka',
            quantity: 500, // 500 ml
            unit: 'ml',
        },
    });

    const menthe = await prisma.ingredient.upsert({
        where: { name: 'Menthe' },
        update: {},
        create: {
            name: 'Menthe',
            quantity: 200, // 200 g
            unit: 'g',
        },
    });

    // Créer un article (par exemple, une recette de Mojito)
    const article = await prisma.article.create({
        data: {
            title: 'Mojito',
            description: 'Un cocktail rafraîchissant.',
            published: true,
        },
    });

    // Associer les ingrédients avec des quantités spécifiques au Mojito
    await prisma.articleIngredient.create({
        data: {
            article: { connect: { id: article.id } },
            ingredient: { connect: { id: rhum.id } },
            quantity: 50, // 50 ml de rhum pour la recette
        },
    });

    await prisma.articleIngredient.create({
        data: {
            article: { connect: { id: article.id } },
            ingredient: { connect: { id: vodka.id } },
            quantity: 50, // 50 ml de vodka pour la recette
        },
    });

    await prisma.articleIngredient.create({
        data: {
            article: { connect: { id: article.id } },
            ingredient: { connect: { id: menthe.id } },
            quantity: 10, // 10 g de menthe pour la recette
        },
    });

    console.log({userAdmin, article});
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });