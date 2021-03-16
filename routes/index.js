module.exports = (app) => {
    const controller = require('../controllers/index.js');
    const auth = require('../lib/auth')

    /* GET home page. */
    app.get('/usuarios', auth.jwtVerify, controller.getUsuarios);
    app.get('/usuarios/:id', controller.getUsuarioByID);
    app.post('/usuarios', controller.createUsuario);
    app.put('/usuarios', controller.updateUsuario);
    //app.delete('/usuarios/:id', controller.deleteUsuarioById);
    
    app.post('/login', controller.login);//ok
    app.post('/logout', auth.jwtVerify, controller.logout);//ok
    app.get('/me', auth.jwtVerify, controller.meusDados);
}