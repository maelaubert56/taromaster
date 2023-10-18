const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient()

// Middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

/* get the data about the number of users and the number of parties */
router.get("/stats", async (req, res) => {
        const nbUsers = await prisma.users.count()
        const nbParties = await prisma.parties.count()

        return res.status(200).json({nbUsers, nbParties})
})



module.exports = router