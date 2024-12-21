import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
    const passwordAdmin = await bcrypt.hash('Admin', roundsOfHashing);
    const passwordClient = await bcrypt.hash('Client', roundsOfHashing);

    const userAdmin = await prisma.user.upsert({
        where: { email: 'admin@admin.com' },
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

    const userClient = await prisma.user.upsert({
        where: { email: 'client@client.com' },
        update: {
            password: passwordClient,
        },
        create: {
            email: 'client@client.com',
            firstname: 'kantin',
            lastname: 'fagniart',
            role: "client",
            password: passwordClient,
        },
    });

    console.log({ userAdmin });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
