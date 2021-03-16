require('./dbMysql')

const Usuario = require('../model/Usuario')
const Anuncio = require('../model/Anuncio')

Usuario.sync()
.then(()=>{
      Anuncio.sync()
      .then(()=>{
            console.log("Sincronização realizada com sucesso!")
      })
      
})







