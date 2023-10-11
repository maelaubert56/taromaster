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
    const {firstName, lastName, avatar = 0} = req.body


    // if(await userExist(username)) return res.status(400).json("Ce nom d'utilisateur existe déjà")

    const response = await prisma.users.update({
        where:{
            username: old_username
        },
        data:{
            firstName,
            lastName,
            avatar
        }
    })

    return res.status(200).json(response)


})

router.post("delete/:username", async (req, res) => {
    /*
    // get the user id from the token
    const idUser = req.user.idUser

    // check if the user is an admin
    const user = await prisma.users.findUnique({
        where:{
            idUser
        }
    })

    if(!user.admin) return res.status(401).json("Vous n'avez pas les droits pour effectuer cette action")
    else{
        const {username} = req.params
        const response = await prisma.users.delete({
            where:{
                username
            }
        })
        return res.status(200).json(response)
    }*/
    // TODO: temporaire en attendant de gérer les admins dans la bdd
    const {username} = req.params
    // check if the user to delete is not the one who is connected
    const response = await prisma.users.delete({
        where: {
            username
        }
    });
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