import { Router } from 'express'
import { AddToCar, CadastrarProduto, ConsultAllProducts, ConsultarPorNome, FavoriteProduct, ListCarProducts, ListFavorites, ListProductsFromId, RegisterImg } from '../repository/produtoRepository.js'
import multer from 'multer'

const endpoints = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/capasProdutos');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });


endpoints.post('/produtos/cadastrar', async (req, resp) => {
    try {

        const request = req.body

        const response = await CadastrarProduto(request)

        resp.send(response)

    } catch (err) {

        resp.status(401).send({
            erro: err.message
        })

    }
})

endpoints.put('/produtos/:id/poster', upload.single('capa'), async (req, resp) => {
    try {

        const { id } = req.params
        const imagem = req.file ? req.file.path : ''

        const response = await RegisterImg(imagem, id)

        if (response != 1)
            throw new Error('A imagem não pode ser salva')

        resp.status(204).send()

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.get('/produtos/:id', async (req, resp) => {
    try {

        const { id } = req.params

        const response = await ListProductsFromId(id)

        resp.send(response)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

endpoints.get('/produtos', async (req, resp) => {
    try {

        const request = req.query.nome  ;

        const response = await ConsultarPorNome(request)

        resp.send(response)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

endpoints.get('/admin/produtos', async (req, resp) => {
    try {

        const response = await ConsultAllProducts()

        resp.send(response)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})




endpoints.post('/produtos/favoritar', async (req, resp) => {
    try {

        const request = req.body

        const response = await FavoriteProduct(request)

        resp.send(response)

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})
endpoints.post('/produtos/adicionar-carrinho', async (req, resp) => {
    try {

        const request = req.body

        const response = await AddToCar(request)

        resp.send(response)

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

endpoints.get('/produtos/favoritos', async (req, resp) => {
    try {

        const response = await ListFavorites()

        resp.send(response)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


endpoints.get("/produtos/carrinho", async (req, resp) => {
    try {

        const response = await ListCarProducts()

        resp.send(response)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

export default endpoints