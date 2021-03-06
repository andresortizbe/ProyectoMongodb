const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');
const  dotenv =require( "dotenv");
const config = require('./config');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(authRoutes);
app.use(taskRoutes);
app.use(userRoutes);


app.listen(PORT, () => { 
    console.log(PORT);
    mongoose.connect(config.db.host, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error de conexión'));
    db.once('open', () => {
        console.log("Se ha establecido una conexión con la base de datos");
    })
    console.log(`Servidor corriendo en el puerto ${PORT}`) 
});