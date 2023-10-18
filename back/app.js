const express = require('express')
const app = express()
const port = 3333
const cors = require('cors');

const userRoutes = require('./routes/Users')
const partiesRoutes = require("./routes/Parties")
const donnesRoutes = require('./routes/Donnes')
const playerInGamesRoutes = require("./routes/PlayerInGame")
const adminRoutes = require("./routes/Admin")

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json({limit: '50mb'}));

app.use('/users', userRoutes)
app.use('/parties', partiesRoutes)
app.use('/donnes', donnesRoutes)
app.use('/playeringame', playerInGamesRoutes)
app.use('/admin', adminRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})