import con from "./connection.js"

export async function LoginAdm (email , senha){
   const command = 
   `
      select id_admin   id,
             nm_admin   nome,
             ds_email   email
        from tb_admin
      where    ds_email  = ?
        and    ds_senha  = ?
   `

   const [lines] = await con.query(command , [email , senha])
   return lines[0]
}

export async function RegisterAdm (adm){
   const command = 
   `
      insert into tb_admin (nm_admin, ds_email, ds_senha)
                  values(? , ? , ?)
   `

   const resp = await con.query(command , [
      adm.nome,
      adm.email,
      adm.senha
   ])

   const info = resp[0]

   adm.id = info.insertId

   return adm
}
