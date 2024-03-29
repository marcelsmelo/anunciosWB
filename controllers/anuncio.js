const Anuncio = require('../model/Anuncio');
const Usuario = require('../model/Usuario');

module.exports = {
   getMeusAnuncios: (req, res, next) => {
      
      Anuncio.findAll({
         where: { usuarioId: req.user.id },
         include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'email']
         }]
      })
         .then(anuncios => {
            res.status(200).json(anuncios);
         }).catch(error => {
            res.status(500).json({ msg: "Erro ao buscar anúncios!", error: error.errors[0].message });
         });
   },
   getTodosAnuncios: (req, res, next) => {
      Anuncio.findAll({
         include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'email']
         }]
      }).then(anuncios => {
         res.status(200).json(anuncios);
      }).catch(error => {
         res.status(500).json({ msg: "Erro ao buscar anúncios!", error: error.errors[0].message });
      });
   },
   getAnuncioByID: (req, res, next) => {
      Anuncio.findOne({
         where: {
            id: req.params.id,
            usuarioId: req.user.id
         },
         include: [{
            model: Usuario,
            attributes: ['id', 'nome', 'email']
         }]
      })
         .then(anuncio => {
            res.status(200).json(anuncio);
         }).catch(error => {
            res.status(500).json({ msg: "Erro ao buscar anúncio!", error: error.errors[0].message });
         });
   },
   criarAnuncio: (req, res, next) => {
      
      try{
         const anuncio = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            preco: parseFloat(req.body.preco) ,
            usuarioId: req.user.id
         };
      
         Anuncio.create(anuncio).then(anuncio => {
            return res.status(201).json({ msg: "Anúncio criado com sucesso" });
         }).catch(error => {
            return res.status(500).json({ msg: "Erro ao criar anúncio!", error: error.errors[0].message });
         });
      }catch(error){
         return res.status(500).json({ msg: "Erro ao criar anúncio!", error: error.errors[0].message });
      }
      
   },
   editarAnuncio: (req, res, next) => {
      try{
         const anuncio = {
         titulo: req.body.titulo,
         descricao: req.body.descricao,
         preco: parseFloat(req.body.preco),
         usuarioId: req.user.id
      };
      Anuncio.update(anuncio, { where: { id: req.body.id } })
         .then(anuncio => {
            res.status(201).json({ msg: "Anúncio editado com sucesso" });
         }).catch(error => {
            res.status(500).json({ msg: "Erro ao editar anúncio!", error: error.errors[0].message });
         });
      }catch(error){
         return res.status(500).json({ msg: "Erro ao editar anúncio!", error: error.errors[0].message });
      }
      
   },
   removerAnuncio: (req, res, next) => {
      Anuncio.destroy({
         where: {
            id: req.params.id,
            usuarioId: req.user.id
         }
      }).then((rows) => { //Número de linhas afetadas
         if(rows > 0)
            res.status(200).json({ msg: "Anúncio removido com sucesso" });
         else
            res.status(500).json({ msg: "Erro ao remover anúncio!", error: "Você não tem acesso para remover o anúncio solicitado!" });
      }).catch(error => {
         res.status(500).json({ msg: "Erro ao remover anúncio!", error: error.errors[0].message });
      });
   },
};