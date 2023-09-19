const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient()

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

router.post("/create", async (req, res) => {
    const {id_partie, id_preneur, id_choisi, nbPoints, isWin} = req.body

    const response = await prisma.donnes.create({
        data:{
            idPartie: id_partie,
            idPreneur: id_preneur,
            idChoisi: id_choisi,
            nbPoints,
            isWin
        }
    })

    return res.status(200).json(response)

})

router.delete("/:id_donne", async (req, res) => {
    const {id_donne} = req.params

    const response = await prisma.donnes.delete({
        where:{
            idDonne: parseInt(id_donne)
        }
    })

    return res.status(200).json(response)

})

router.get("/:id_donne", async (req, res) => {
    const {id_donne} = req.params

    const response = await prisma.donnes.findUnique({
        where:{
            idDonne: parseInt(id_donne)
        },
        include:{
            partie: true
        }
    })

    return res.status(200).json(response)

})

module.exports = router