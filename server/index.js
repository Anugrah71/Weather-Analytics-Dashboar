require('dotenv').config()
const express = require('express')
const cors = require('cors')
const weatherRoute = require('./routes/weather')
const  apiLimiter  = require('./middlewares/rate-limit')

const app = express()
app.use(cors())
app.use('/api/weather',apiLimiter, weatherRoute)

// const PORT = 4000
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
module.exports = app;
