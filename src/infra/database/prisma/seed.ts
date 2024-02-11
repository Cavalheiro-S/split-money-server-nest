import { prisma } from ".";

async function main() {
    await prisma.user.upsert({
        where: {
            email: "admin@admin.com"
        },
        update: {},
        create: {
            email: "admin@admin.com",
            name: "admin",
            password: "admin",
            balance: 0,
            loginMethod: "email",
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })