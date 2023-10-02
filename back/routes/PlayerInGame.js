const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient()

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.post("/create", async (req, res) => {
    const {id_partie, id_joueur, points} = req.body

    const response = await prisma.playerInGame.create({
        data:{
            idPartie: id_partie,
            idJoueur: id_joueur,
            points
        }
    })

    return res.status(200).json(response)

})

router.post("/update/:id_partie/:id_joueur", async (req, res) => {
    const {id_partie, id_joueur} = req.params
    const {points} = req.body

    const response = await prisma.playerInGame.update({
        where: {
            idJoueur_idPartie: {
                idJoueur: parseInt(id_joueur),
                idPartie: parseInt(id_partie)
            }
        },
        data:{
            points
        }
    })

    return res.status(200).json(response)

})

router.get("/:id_partie", async (req, res) => {

    const {id_partie} = req.params
    
    const response = await prisma.playerInGame.findMany({
        where:{
            idPartie: parseInt(id_partie)
        },
        orderBy:{
            points: "desc"
        },
        include:{
            joueur: true,
            partie: true
        }
    })

    return res.status(200).json(response)

})

router.delete("/:id_partie/:id_player", async (req, res) => {
    const {id_partie, id_player} = req.params

    const response = await prisma.playerInGame.delete({
        where:{
            idJoueur_idPartie: {
                idJoueur: parseInt(id_player),
                idPartie: parseInt(id_partie)
            }
        }
    })

    return res.status(200).json(response)

})


router.get("/:id_partie/:id_player", async (req, res) => {
    const {id_partie, id_player} = req.params

    const response = await prisma.playerInGame.findUnique({
        where:{
            idJoueur_idPartie: {
                idJoueur: parseInt(id_player),
                idPartie: parseInt(id_partie)
            }
        },
        include:{
            joueur: true
        }
    })

    return res.status(200).json(response)

})


router.get("/join/:max_date/:id_partie/:id_joueur", async (req, res) => {
    const {max_date, id_joueur, id_partie} = req.params

    if(new Date() > max_date){
        return res.status(400).json("Ce lien d'invitation a expiré")
    }

    const userInGame = await prisma.playerInGame.findUnique({
        where:{
            idJoueur_idPartie: {
                idJoueur: parseInt(id_joueur),
                idPartie: parseInt(id_partie)
            }
        }
    })

    if(userInGame){
        return res.status(400).json("Vous avez déjà rejoins la partie")
    }

    const response = await prisma.playerInGame.create({
        data:{
            idPartie: parseInt(id_partie),
            idJoueur: parseInt(id_joueur),
            points: 0
        }
    })

    return res.status(200).json(response)


})

module.exports = router