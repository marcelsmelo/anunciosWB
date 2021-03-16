const Usuario = require('../model/Usuario');

module.exports = {
    getUsuarios: (req, res, next) => {
        Usuario.findAll().then(usuarios => {
            res.status(200).json(usuarios);
        }).catch(error => {
            res.status(500).json({ msg: "Erro ao buscar usuários!", error: error.message});
        });

    },
    getUsuarioByID: (req, res, next) => {
        Usuario.findById(req.params.id).then(usuario => {
            res.status(200).json(usuario);
        }).catch(error => {
            res.status(500).json({ msg: "Erro ao recuperar usuário!", error: error.message  });
        });
    },
    createUsuario: (req, res, next) => {
        const user = {
            nome: req.body.nome,
            telefone: req.body.telefone,
            senha: req.body.senha
        };
        Usuario.create(user).then(usuario => {
            res.status(201).json({ msg: "Usuário criado com sucesso" });
        }).catch(error => {
            res.status(500).json({ msg: "Erro ao cadastrar usuário!", error: error.message  });
        });
    },
    updateUsuario: (req, res, next) => {
        const user = {
            nome: req.body.nome,
            telefone: req.body.telefone,
            senha: req.body.senha
        };

        Usuario.update(user, { where: { id: req.body.id } })
            .then(usuario => {
                res.status(200).json({ msg: "Usuário editado com sucesso" });
            }).catch(error => {
                res.status(500).json({ msg: "Erro ao editar usuário!", error: error.message  });
            });
    },
    deleteUsuarioById: (req, res, next) => {
        Usuario.destroy({
            where: {
                id: req.params.id
            }
        }).then((rows) => { //Número de linhas afetadas
            res.status(200).json({ msg: "Usuário removido com sucesso" });
        }).catch(error => {
            res.status(500).json({ msg: "Erro ao remover usuário!", error: error.message  });
        });
    },

    login: (req, res, next)=>{
        Usuario.findOne({
            where: {telefone: req.body.telefone},
          }).then((user)=>{
            if (!user) {
                //Usuário (telefone) não foi encontrado
                res.status(500).json({
                  msg: "Usuário não encontrado! Tente novamente",
                  error: null,
                });
              } else {
                //Usuário encontrado, verificar senha
                if (user.comparePassword(req.body.senha)) {
                  //Senha informada está correta
                  user
                    .generateAuthToken() //Gerar o token JWT
                    .then((sucesso) => {
                      //Token gerado com sucesso
                      res.status(200).json(sucesso);
                    })
                    .catch((error) => {
                      //Erro ao gerar o Token JWT
                      res.status(500).json({
                        msg: "Erro ao realizar o login!",
                        error: error.message,
                      });
                    });
                } else {
                  //Senha informada está incorreta
                  res.status(500).json({
                    msg: "Senha informada está incorreta!",
                    error: null,
                  });
                }
              }
          }).catch((error) => {
            res.status(500).json({
            msg: "Usuário não encontrado!",
            error: null,
        });
      });
    },

    logout: async (req, res, next)=>{
        try {
            await Usuario.update(
              {
                token: null,
              },
              {
                where: {
                  id: req.user.id,
                },
              }
            );
            res.status(200).send({ msg: "Logout realizado com sucesso!" });
          } catch (error) {
            res
              .status(500)
              .send({ msg: "Logout não realizado!", error: error.message });
          } 
    },
    //Retorna os dados do usuário logado
  meusDados: async (req, res, next) => {
    try {
      let dados = await Usuario.findOne({
        where: {
          id: req.user.id
        },
      });
      return res.status(200).json(dados);
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Erro ao buscar informações", error: error.message });
    }
  },
};