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
    const {username, password, avatar } = req.body
    if(await userExist(username)) return res.status(400).json("Ce nom d'utilisateur est déjà utilisé")

    const response = await prisma.users.create({
        data:{
            username,
            avatar,
            password
        }
    })

    return res.status(200).json(response)
})

//update privilege
router.post("/update/privilege/:idUser", async (req, res) => {
    const {idUser} = req.params
    const {privilege} = req.body

    const response = await prisma.users.update({
        where:{
            idUser: parseInt(idUser)
        },
        data:{
            privilege: parseInt(privilege)
        }
    })

    return res.status(200).json(response)
})

router.post("/update/:old_username", async (req, res) => {

    const {old_username} = req.params
    const {avatar = 0} = req.body


    // if(await userExist(username)) return res.status(400).json("Ce nom d'utilisateur existe déjà")

    const response = await prisma.users.update({
        where:{
            username: old_username
        },
        data:{
            avatar
        }
    })

    return res.status(200).json(response)


})


router.post("/delete/:idToDelete", async (req, res) => {

    // check if the user is an admin
    const asker = await prisma.users.findUnique({
        where:{
            idUser: req.body.idAsker
        }
    })

    if(asker.privilege === 0) return res.status(401).json("Vous n'avez pas les droits pour effectuer cette action")
    else{
        const {idToDelete} = req.params
        const response = await prisma.users.delete({
            where:{
                idUser: parseInt(idToDelete)
            }
        })
        return res.status(200).json(response)
    }
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
            },

        }
    })

    return res.status(200).json(response)

})

router.get("/data/all", async (req, res) => {
    // limit the number of users to 100
    const response = await prisma.users.findMany({
        orderBy: {
            username: "asc"
        },
        take: 50
    })
    return res.status(200).json(response);
});

router.get("/search/:username", async (req, res) => {

    const {username} = req.params

    const response = await prisma.users.findMany({
        orderBy: {
            username: "asc"
        },
        where:{
            username: {
                contains: username
            }
        },
        take: 50
    })

    return res.status(200).json(response)

})




module.exports = router