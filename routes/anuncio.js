module.exports = (app) => {
   const controller = require('../controllers/anuncio.js');
   const auth = require('../lib/auth')

   /* GET home page. */
   app.get('/anuncios', auth.jwtVerify, controller.getMeusAnuncios);
   app.get('/anuncios/:id', auth.jwtVerify, controller.getAnuncioByID);
   app.post('/anuncios', auth.jwtVerify, controller.criarAnuncio);
   app.put('/anuncios', auth.jwtVerify, controller.editarAnuncio);
   app.delete('/anuncios/:id', auth.jwtVerify, controller.removerAnuncio); 
}