/** 
  @swagger
  {
    "components":{
      "schemas":{
        "Usuario":{
          "properties":{
            "id":{"type":"integer"},
            "nome":{"type":"string"},
            "email":{"type":"string"},
            "senha":{"type":"string"}
          }
        },
        "Anuncio":{
          "properties":{
            "id":{"type":"integer"},
            "titulo": {"type":"string"},
            "descricao": {"type":"string"},
            "preco": {"type": "double"},
            "usuarioId":{"type:":"integer"}
          }
        },
      }
    }
  }
*/
