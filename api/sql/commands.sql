insert into tb_marcas(nm_marca)
				values(?);

				SELECT produtos.* FROM produtos INNER JOIN favoritos ON produtos.id = favoritos.produto_id WHERE favoritos.usuario_id = ?'