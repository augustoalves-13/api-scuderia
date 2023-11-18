import { Router } from "express";
import { ListarEndereco, Save } from "../repository/enderecoRepository.js";

const endpoints = Router()

endpoints.get('/user/:id/endereco', async(req,resp) => {
    try {

        const id = req.params.id

        const res = await ListarEndereco(id)

        resp.send(res)
        
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

endpoints.post('/user/:id/endereco', async(req,resp) => {
    try {

        const id = req.params.id
        const endereco = req.body

        const res = await Save(id, endereco)

        resp.status(204).send()
        
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

export default endpoints