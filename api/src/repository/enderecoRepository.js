import con from "./connection.js"

export async function ListarEndereco(idUser){
    const command =     
    `
    select id_usuario_endereco		id,
    ds_ref                  ref,
    ds_cep					cep,
    ds_logradouro			logradouro,
    ds_bairro				bairro,
    ds_cidade				cidade,
    ds_estado				estado,
    ds_complemento			complemento
from tb_usuario_endereco
where id_usuario = 1;
    `

    const [resgistro] = await con.query(command, [idUser])
    return resgistro
}

export async function Save(idUser , endereco){
    const command = 
    `
    insert into tb_usuario_endereco(id_usuario, ds_ref, ds_cep, ds_logradouro, ds_bairro, ds_cidade, ds_estado, ds_numero, ds_complemento)
    values(?,?,?,?,?,?,?,?,?)
    `

    const [reps] = await con.query(command, [idUser, endereco.ref , endereco.cep , endereco.logradouro , endereco.bairro , endereco.cidade , endereco.estado , endereco.numero , endereco.complemento])
    return reps.insertId
}