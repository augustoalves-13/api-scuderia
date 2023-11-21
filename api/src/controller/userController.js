import {Router} from  'express'
import { ListFromId, ListUser, ListUserFromName, UserLogin, UserRegister } from '../repository/userRepository.js'
import con from '../repository/connection.js'

const endpoints = Router()

endpoints.post('/user/login' , async(req , resp) => {
    try {

        const {email , senha} = req.body

        const response = await UserLogin(email , senha)

        if(!response)
            throw new Error('Credenciais Inválidas  ')

        resp.send(response)
        
    } catch (err) {
        resp.status(401).send({
            erro:err.message
        })
    }
})

endpoints.post('/user/cadastro' , async(req,resp)=>{
    try {

        const request = req.body

        const response = await UserRegister(request)

        resp.send(response)
        
    } catch (err) {
        resp.status(401).send({
            erro:err.message
        })
    }
})

endpoints.get('/user' , async(req, resp) => {
    try {

        const response = await ListUser()

        resp.send(response)
        
    } catch (err) {
        resp.status(404).send({
            erro:err.message
        })
    }
})

endpoints.get('/user/:id' , async(req, resp) => {
    try {

        const {id} = req.params

        const response = await ListFromId(id)

        resp.send(response)
        
    } catch (err) {
        resp.status(404).send({
            erro:err.message
        })
    }
})

endpoints.get('/user/name' , async(req, resp) => {
    try {

        const name = req.query.nome 

        const response = await ListUserFromName(name)

        resp.send(response)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message   
        })
    }
})

export default endpoints