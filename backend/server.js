const express = require('express');
const cors = require('cors') ; 

const app = express() ; 
const PORT = 5000  ; 

//middleware
app.use(cors()) ;
app.use(express.json()) ; 

//course routes now 
const courseRoutes = require('./routes/courseRoutes') ; 
app.use('/api/routes/', courseRoutes) ; 

app.listen(PORT, () => {
    console.log("Listening on port" + PORT) ; 
}) ; 

