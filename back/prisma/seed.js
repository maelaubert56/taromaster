const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const add = async () => {
    await prisma.users.create({
        data: {
            username: "superadmin",
            firstName: "super",
            lastName: "admin",
            avatar: 0,
            password: bcrypt.hashSync("DZvz&kFo23X9Z&iiHF*Z", salt),
            privilege: 2
        }
    })
}

add()