const Anuncio = require('../model/Anuncio');

module.exports = {
   getMeusAnuncios: (req, res, next) => {
      Anuncio.findAll({where: {usuarioId: req.user.id}})
      .then(anuncios => {
         res.status(200).json(anuncios);
      }).catch(error => {
         res.status(500).json({ msg: "Erro ao buscar anúncios!", error: error.message });
      });
   },
   getTodosAnuncios: (req, res, next) => {
      Anuncio.findAll().then(anuncios => {
         res.status(200).json(anuncios);
      }).catch(error => {
         res.status(500).json({ msg: "Erro ao buscar anúncios!", error: error.message });
      });
   },
   getAnuncioByID: (req, res, next) => {
      Anuncio.findOne({where: {
         id: req.params.id,
         usuarioId: req.user.id }
      })
     .then(anuncio => {
         res.status(200).json(anuncio);
      }).catch(error => {
         res.status(500).json({ msg: "Erro ao buscar anúncio!", error: error.message });
      });
   },
   criarAnuncio: (req, res, next) => {
      const anuncio = {
         titulo: req.body.titulo,
         descricao: req.body.descricao,
         preco: req.body.preco,
         usuarioId: req.user.id
      };
      Anuncio.create(anuncio).then(anuncio => {
         res.status(201).json({ msg: "Anúncio criado com sucesso" });
      }).catch(error => {
         res.status(500).json({ msg: "Erro ao criar anúncio!", error: error.message });
      });
   },
   editarAnuncio: (req, res, next) => {
      const anuncio = {
         titulo: req.body.titulo,
         descricao: req.body.descricao,
         preco: req.body.preco,
         usuarioId: req.user.id
      };
      Anuncio.update(anuncio, { where: { id: req.body.id } })
         .then(anuncio => {
            res.status(201).json({ msg: "Anúncio editado com sucesso" });
         }).catch(error => {
            res.status(500).json({ msg: "Erro ao editar anúncio!", error: error.message });
         });
   },
   removerAnuncio: (req, res, next) => {
      Anuncio.destroy({
          where: {
              id: req.params.id,
              usuarioId: req.user.id
          }
      }).then((rows) => { //Número de linhas afetadas
          res.status(200).json({ msg: "Anúncio removido com sucesso" });
      }).catch(error => {
          res.status(500).json({ msg: "Erro ao remover anúncio!", error: error.message  });
      });
  },
};