import con from "./connection.js"

export async function CadastrarProduto(produto) {
    const comando =
        `
    insert into tb_produtos(id_marca , nm_modelo , ds_descricao , vl_valor , vl_avaliacao , bl_situacao)
				values(? , ? , ? , ? , ? , ?);
    `

    const resp = await con.query(comando, [
        produto.marca,
        produto.modelo,
        produto.descricao,
        produto.valor,
        produto.avaliacao,
        produto.situacao
    ])

    const info = resp[0]

    produto.id = info.insertId

    return produto
}

export async function RegisterImg(imagem, id) {
    const command =
        `
        update tb_produtos
            set img_banner      = ?
            where id_produtos   = ?
    `

    const [resp] = await con.query(command, [imagem, id])
    return resp.affectedRows
}

export async function ConsultarPorNome(nome) {
    const comando =
        `
    select id_produtos	id,
		id_marca 	marca,
        nm_modelo	nome,
        vl_valor	valor,
        vl_avaliacao	avaliacao,
        bl_situacao		situacao
	from tb_produtos
		where nm_modelo	like ?
    `

    const [lines] = await con.query(comando, [`%${nome}%`])

    console.log(lines)

    return lines[0]
}

export async function ConsultAllProducts() {
    const command =
        `
    select id_produtos	id,
        id_marca 	id,
        nm_modelo	nome,
        vl_valor	valor,
        vl_avaliacao	avaliacao,
        bl_situacao		situacao
    from tb_produtos
    `

    const [lines] = await con.query(command)

    return lines
}

export async function ListProductsFromId(id) {

    const command =

        `
    select id_produtos	    id,
            id_marca 	    id,
            nm_modelo	    nome,
            vl_valor	    valor,
            vl_avaliacao	avaliacao,
            bl_situacao		situacao,
            img_banner      img,
            ds_descricao    descricao
    from  tb_produtos
    where id_produtos   = ?            
    `

    const [lines] = await con.query(command , [id])

    return lines

}

export async function FavoriteProduct(favorite) {
    const command =
        `
    INSERT INTO tb_favoritos (produto_id) VALUES (?)
    `

    const resp = await con.query(command, [
        favorite.produto
    ])

    const info = resp[0]

    favorite.id = info.insertId

    return favorite
}

export async function ListFavorites() {
    const command =
        `
        SELECT tb_produtos.* FROM tb_produtos INNER JOIN tb_favoritos ON tb_produtos.id_produtos = tb_favoritos.produto_id
    `

    const [lines] = await con.query(command)

    return lines

}
export async function ListCarProducts() {
    const command =
        `
        SELECT tb_produtos.* FROM tb_produtos INNER JOIN tb_carrinho ON tb_produtos.id_produtos = tb_carrinho.produtos
        `



    const [lines] = await con.query(command)
    console.log(lines)
    return lines
}

export async function AddToCar(product) {
    const command =
        `
    insert into tb_carrinho (produtos)
            values(?)
    `

    const resp = await con.query(command, [
        product.produto
    ])

    const info = resp[0]

    product.id = info.insertId

    return product
}
