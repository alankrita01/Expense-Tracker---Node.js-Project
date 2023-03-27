const path = require('path');
const express = require('express');
const sequelize = require('./util/database');
const userRouter = require('./routes/userRoutes');

const cors = require('cors');
const bodyParser = require('body-parser');

const app= express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', async (req,res,next) => {
  res.sendFile(__dirname+'/public/signup.html')
})

app.use(express.static('public'));



app.use('/user',userRouter);

sequelize.sync({alter : true})
.then(result => {
  app.listen(3000, () => {
    console.log('server started');
  })
})
.catch(err => console.log(err));