import {Router} from 'express'
import { LoginAdm, RegisterAdm } from '../repository/adminRepository.js'

const endpoints = Router()

endpoints.post("/adm/login" , async (req, resp) => {
   try {

      const {email, senha} = req.body

      if(!email || !senha)
         throw new Error('Email ou senha inválidos')

      const response = await LoginAdm(email , senha)

      resp.send(response)
      
   } catch (err) {
      resp.status(401).send({
         erro: err.message
      })
   }
})

endpoints.post('/adm/cadastrar' , async(req , resp) => {
   try {

      const request = req.body

      if(!request.nome)
            throw new Error ('Informe o nome do Administrador')

      if(!request.email)
            throw new Error('informe o Email do Administrador')

      if(!request.senha || request.senha.length < 8)
            throw new Error('Senha Inválida, a senha deve conter no mínimo 8 caracteres')

      const response = await RegisterAdm(request)

      resp.send(response)
      
   } catch (err) {
      resp.status(401).send({
         erro:err.message
      })
   }
})

export default endpoints