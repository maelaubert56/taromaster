const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const add = async () => {

    const superadmin = await prisma.users.findUnique({
        where: {
            username: "superadmin"
        }
    })

    if(!superadmin)
        await prisma.users.create({
            data: {
                username: "superadmin",
                avatar: 957153,
                password: bcrypt.hashSync("DZvz&kFo23X9Z&iiHF*Z", salt),
                privilege: 2
            }
        })
}

add()