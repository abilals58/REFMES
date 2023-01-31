const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const port=process.env.PORT || 4800;
const app=express();
const cors = require("cors");
require("dotenv").config({path:"./config.env"});

app.use(cors())
app.use(express.json())
//DB config
const db=process.env.MONGO_URL;
//connect to Mongo
mongoose
    .connect(db)
    .then(()=>console.log("MongoDB Connected...."))
    .catch((err)=>console.log(err));

//Use routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/referees',require('./routes/api/referees'));
app.use('/api/matches',require('./routes/api/matches'));
app.use('/api/comments',require('./routes/api/comments'));
app.use('/api/postRatings',require('./routes/api/postRatings'));
app.use('/api/preRatings',require('./routes/api/preRatings'));
app.use('/api/clubs',require('./routes/api/clubs'));
app.use('/api/weeks',require('./routes/api/weeks'));
app.use('/api/admin',require('./routes/api/admin'));
app.use('/api/refereesOfWeek',require('./routes/api/refereesOfWeek'));

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });
  }
app.listen(port,()=>console.log(`Server started on port ${port}`));