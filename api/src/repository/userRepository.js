import con from "./connection.js"

export async function UserLogin(email , senha){
    const command = 
    `
        select id_cliente   id,
                nm_cliente  cliente,
                ds_email    email
           from tb_cliente
          where ds_email  = ?
            and ds_senha  = ?

    `

    const [lines] = await con.query(command , [email , senha])
    return lines[0]
}

export async function UserRegister(user){
    const command = 
    `
    insert into tb_cliente(nm_cliente , ds_cpf , nr_telefone , ds_email , ds_senha)
				values(? , ? , ? , ? , ?);
    `

    const resp = await con.query(command , [
        user.nome,
        user.cpf,
        user.telefone,
        user.email,
        user.senha
    ])

    const info = resp[0]
    user.id = info.insertId

    return user

}

export async function ListUser(){
    const command = 
    `
    select id_cliente   id,
        nm_cliente      cliente,
        nr_telefone     telefone,
        ds_cpf          cpf,
        ds_email        email
    from tb_cliente
    `

    const [lines] = await con.query(command)

    return lines
}

export async function ListFromId(id){
    const command = 
    `
    select id_cliente   id,
        nm_cliente      cliente,
        nr_telefone     telefone,
        ds_cpf          cpf,
        ds_email        email
    from tb_cliente
    where id_cliente =  ?   
    `

    const [lines] = await con.query(command , [id]) 
    return lines
    
}

export async function ListUserFromName(name){
    const command = 
    `
    select id_cliente   id,
        nm_cliente      cliente,
        nr_telefone     telefone,
        ds_cpf          cpf,
        ds_email        email
    from tb_cliente
    where nm_cliente  =  ?
    `

    const lines = await con.query(command , `%${name}%`)
    return lines
}