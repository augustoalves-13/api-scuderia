import {Router} from  'express'
import { UserLogin, UserRegister } from '../repository/userRepository.js'

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

export default endpoints