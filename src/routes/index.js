const {Router} = require('express');
const router = Router();
const fs = require('fs'); //modulo file system para leer archivos del archivo .json
const { v4: uuidv4 } = require('uuid');


const json_libros = fs.readFileSync('src/books.json','utf-8'); //lectura de datos
let libros = JSON.parse(json_libros); //arreglo para guardar datos de formulario de libros

router.get('/',(req,res)=>{ //ruta principal
    res.render('index.ejs',{
        libros
    })
});

router.get('/nueva-entrada',(req,res)=>{ //ruta para nueva entrada
    res.render('nueva-entrada.ejs')
});

router.post('/nueva-entrada',(req,res)=>{ //ruta para mandar datos de la view nueva entrada
    const {titulo, autor, imagen, descripcion} = req.body; //metodo de autenticacion
    if(!titulo || !autor || !imagen || !descripcion){
        res.status(400).send('Por favor llene todos los campos del formulario');
        return;

    }

    var nuevoLibro ={
        id: uuidv4(),
        titulo,
        autor,
        imagen,
        descripcion
    };
                                             
    libros.push(nuevoLibro); //variable para guardar datos del formulario


    const json_libros = JSON.stringify(libros)
    fs.writeFileSync('src/books.json', json_libros, 'utf-8');
     //guardar los datos que se almacenen. de manera asincrona ('marcar la ruta del archivo, constante del arreglo, formato en que se guardaran los datos')

    res.redirect('/'); //al momento de que se almacene un mandara por defecto a la pagina principal

});

router.get('/borrar/:id',(req,res)=>{ //ruta para eliminar dato.
    libros = libros.filter(libro => libro.id != req.params.id); // ciclo para obtener el libro para su borrado.
    const json_libros = JSON.stringify(libros)
    fs.writeFileSync('src/books.json', json_libros, 'utf-8');
    res.redirect('/');

})
  
module.exports = router;