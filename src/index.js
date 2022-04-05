const app = require('./app') //importar datos de app.js

//creacion de servidor de manera asincrona
async function main(){
    await app.listen(app.get('port')); //se manda a llamar al puerto del servidor con app.get('port)
    console.log('Servidor en puerto',app.get('port'));
}

main();