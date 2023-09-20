const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient()

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

const userExist = async (username) => {
    const userExist = await prisma.users.findUnique({
        where:{
            username
        }
    })

    if(userExist) return true
    return false
}

router.post("/create", async(req, res) => {
    const { firstName, lastName, username, password, avatar } = req.body
    if(await userExist(username)) return res.status(400).json("Ce nom d'utilisateur est déjà utilisé")

    const response = await prisma.users.create({
        data:{
            username,
            firstName,
            lastName,
            avatar,
            password
        }
    })

    return res.status(200).json(response)
})

router.post("/update/:old_username", async (req, res) => {

    const {old_username} = req.params
    const {username, firstName, lastName, avatar} = req.body


    if(await userExist(username)) return res.status(400).json("Ce nom d'utilisateur existe déjà")

    const response = await prisma.users.update({
        where:{
            username: old_username
        },
        data:{
            username,
            firstName,
            lastName,
            avatar
        }
    })

    return res.status(200).json(response)


})

router.get("/:username", async (req, res) => {
    const {username} = req.params

    const response = await prisma.users.findUnique({
        where:{
            username
        },
        include:{
            playerInGames: {
                include:{
                    partie: {
                        include:{
                            donnes: true,
                            playerInGames: {
                                orderBy: {
                                    points: "desc"
                                },
                                include:{
                                    joueur: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return res.status(200).json(response)

})

router.get("/search/:username", async (req, res) => {

    const {username} = req.params

    const response = await prisma.users.findMany({
        where:{
            username: {
                contains: username
            }
        }
    })

    return res.status(200).json(response)

})


module.exports = router