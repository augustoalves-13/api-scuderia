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

CREATE TABLE tb_favoritos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT,
  FOREIGN KEY (produto_id) REFERENCES tb_produtos(id_produtos)
);

create table tb_carrinho(
	id_carrinho int primary key auto_increment,
    produtos int,
    
    FOREIGN KEY (produtos) REFERENCES tb_produtos(id_produtos)
)