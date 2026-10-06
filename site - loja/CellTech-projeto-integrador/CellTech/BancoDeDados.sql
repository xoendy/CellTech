CREATE table funcionarios(
	id int auto_increment primary key,
    nome varchar(100) not null,
    cpf varchar(15) not null UNIQUE,
    telefone varchar(20) not null,
    email varchar(120) not null UNIQUE,
    data_cadastro datetime default current_timestamp,
    cargo varchar(100) not null
);
CREATE table cliente(
	id int auto_increment primary key,
    nome varchar(100) not null,
    cpf varchar(15) not null UNIQUE,
    telefone varchar(20) not null,
    email varchar(120) not null UNIQUE,
    data_cadastro datetime default current_timestamp
);
CREATE table produtos(
	id int auto_increment primary key,
    nome varchar(100) not null,
    marca varchar(100) not null,
    modelo varchar(100) not null,
    cor varchar(100) not null UNIQUE,
    preco varchar(100) not null,
    estoque varchar(100) not null,
    data_cadastro datetime default current_timestamp
);
CREATE table venda(
	id int auto_increment primary key,
    clienteId varchar(100) not null,
    Quantidade varchar(100) not null,
    valor varchar(100) not null UNIQUE,
    desconto varchar(100) not null,
    pagamento varchar(100) not null,
    data_venda datetime default current_timestamp
);
