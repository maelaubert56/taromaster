const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient()

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.post("/create", async (req, res) => {
    const {name, banner} = req.body

    const response = await prisma.parties.create({
        data:{
            name,
            banner
        }
    })

    return res.status(200).json(response)

})

router.post("/update/:id_partie", async (req, res) => {
    const {name, banner} = req.body
    const {id_partie} = req.params

    const response = await prisma.parties.update({
        where:{
            idPartie: parseInt(id_partie),
        },
        data:{
            name,
            banner
        }
    })

    return res.status(200).json(response)

})

router.get("/:id_partie", async (req, res) => {

    const {id_partie} = req.params

    const response = await prisma.parties.findUnique({
        where:{
            idPartie: parseInt(id_partie)
        },
        include:{
            donnes: true,
            playerInGames: true
        }
    })

    return res.status(200).json(response)

})

module.exports = router