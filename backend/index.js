const express = require("express")
const morgan = require('morgan');
const cors = require("cors");
require('dotenv').config()

const app = express();


// Db connection
const { mongoose } = require("./dataBase");


// Settings 
app.set('port', process.env.PORT || 4000);



// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/katas', require('./routes/KatasRoutes'));
app.use("/api/register", require("./routes/RegisterUser"));
app.use("/api/private", require("./routes/kataprivad"));



// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});