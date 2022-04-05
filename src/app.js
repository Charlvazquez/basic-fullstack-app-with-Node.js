const express = require('express')
const app = express();
const path = require('path'); //constante para el mapeo de ruta
const morgan = require('morgan'); //constante para middleware


//configuraciones
// especificacion para puerto de servidor.
app.set('port',5020)
//especificacion para rutas de archivos views.
app.set('views',path.join(__dirname, 'views'))
// especificacion de plantillas a usar, para llamarla usar npm i ejs
app.set('views engine','ejs');

//middlewares
app.use(morgan('dev'));
//linea para convertir archivos .json
app.use(express.urlencoded({extended: false}));

//rutas
//indicar la ruta de donde se ubicaran todas las rutas que vayamos hacer.
app.use(require('./routes/index'));


//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Mensaje de error, en caso de que no se busco la ruta solicitada.
app.use((req,res,next) => {
    res.status(404).send('no jala el server carnal');
})


module.exports = app;