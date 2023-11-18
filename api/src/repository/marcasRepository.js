import con from "./connection.js"

export async function CadastrarMarca(marca) {
    const comando =
        `
    insert into tb_marcas(nm_marca)
                        values(?);
    `

    const [resp] = await con.query(comando , [
        marca.nome
    ])
    marca.id = resp.insertId

    return resp
}

export async function ConsultarTodos(){
    const comando = 
    `
        select id_marca    id,
                nm_marca    nome
            from tb_marcas
    `

    const [lines] = await con.query(comando)

    return lines
}