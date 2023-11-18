import { Router } from 'express'
import { CadastrarMarca, ConsultarTodos } from '../repository/marcasRepository.js'

const endpoints = Router()

endpoints.post('/marcas/cadastrar', async (req, resp) => {
    try {

        const request = req.body

        const response = await CadastrarMarca(request)

        resp.send(response)

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

endpoints.get('/marcas', async (req, resp) => {
    try {

        const response = await ConsultarTodos()

        resp.send(response)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


export default endpoints