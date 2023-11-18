import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import produtoController from './controller/produtoController.js'
import marcasController from './controller/marcasController.js'
import userController from './controller/userController.js'
import enderecoController from './controller/enderecoController.js'

const server = express()

server.use(express.json())
server.use(cors())


//arquivos storage
server.use('/storage/capasProdutos' , express.static('storage/capasProdutos '))

//endpoints
server.use(userController)
server.use(produtoController)
server.use(enderecoController)
server.use(marcasController)

server.listen(process.env.MYSQL_PORT , 
            ()=>console.log("API ONLINE"))