create database db_scuderia;

use db_scuderia;

create table tb_marcas(
	id_marca int primary key auto_increment,
	nm_marca varchar(100)
);

create table tb_produtos(
	id_produtos int primary key auto_increment,
	id_marca int,
	nm_modelo varchar(100),
	ds_descricao varchar(1000),
	vl_valor decimal(10,2),
	vl_avaliacao decimal(15,3),
	bl_situacao boolean default false,
	img_banner varchar(800),
	
	foreign key (id_marca) references tb_marcas(id_marca)
);


create table tb_cliente(
	id_cliente 		int primary key auto_increment,
	nm_cliente 		varchar(100),
	ds_cpf 			varchar(100),
	nr_telefone 	varchar(100), 
	ds_email 		varchar(100), 
	ds_senha 		varchar(100)
);

create table tb_usuario_endereco(
	id_usuario_endereco 	int primary key auto_increment, 
	id_usuario 				int, 
	ds_ref 					varchar(100), 
	ds_cep 					varchar(20) ,
	ds_logradouro 			varchar(100), 
	ds_bairro 				varchar(100), 
	ds_cidade 				varchar(100), 
	ds_estado 				varchar(100), 
	ds_complemento 		varchar(100),
    
    foreign key (id_usuario) references tb_cliente(id_cliente),
)	

create table tb_admin (
	id_admin 	int primary key auto_increment,
	nm_admin		varchar(100),
	ds_email		varchar(100),
	ds_senha		varchar(100)
)

create table tb_cupom (
	id_cupom 		int primary key auto_increment,
	cod_cupom		varchar(200),
	vl_cupom			decimal(15,2),
	qtd_restante	int
)

create table tb_pedido(
	id_pedido				int primary key auto_increment,
	id_usuario 				int,
	id_usuario_endereco	int,
	id_cupom					int,
	dt_pedido				datetime,
	cod_nota_fiscal		varchar(200),
	tp_frete					varchar(200),
	ds_status				varchar(200),
	tp_pagamento			varchar(200),

	foreign key (id_usuario) references tb_cliente (id_cliente),
	foreign key (id_usuario_endereco) references tb_usuario_endereco (id_usuario_endereco),
	foreign key (id_cupom) references tb_cupom (id_cupom)
);

create table tb_pedido_item(
	id_pedido_item			int primary key auto_increment,
	id_pedido				int,
	id_produto				int,
	qtd_itens				int,
	vl_produto				decimal(15,2),

	foreign key (id_pedido) references tb_pedido (id_pedido),
	foreign key (id_produto) references tb_produtos (id_produto)
);

create table tb_pagamento_cartão (
	id_pagamento_cartão	int primary key auto_increment,
	id_pedido				int,
	nm_cartao				varchar(200),
	nr_cartao				varchar(200),
	dt_vencimento			varchar(200),			
	cod_seguranca			varchar(200),
	nr_parcelas				int,
	ds_forma_pagamento	varchar(200),
	
	foreign key (id_pedido) references tb_pedido (id_pedido)
)