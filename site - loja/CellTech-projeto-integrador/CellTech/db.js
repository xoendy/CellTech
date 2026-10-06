const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'celltech.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    armazenamento TEXT NOT NULL,
    cor TEXT NOT NULL,
    preco REAL NOT NULL DEFAULT 0,
    estoque INTEGER NOT NULL DEFAULT 0,
    imagem TEXT DEFAULT '',
    emoji TEXT DEFAULT '▰',
    tema TEXT DEFAULT 'blue'
  );
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    cpf TEXT NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT NOT NULL,
    endereco TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY,
    clienteId INTEGER NOT NULL,
    produtoId INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    total REAL NOT NULL,
    pagamento TEXT NOT NULL,
    data TEXT NOT NULL,
    FOREIGN KEY (clienteId) REFERENCES clientes(id),
    FOREIGN KEY (produtoId) REFERENCES produtos(id)
  );
`);

const seed = db.prepare('SELECT COUNT(*) AS total FROM produtos').get();
if (seed.total === 0) {
  const inserirProduto = db.prepare(`INSERT INTO produtos (id,nome,marca,modelo,armazenamento,cor,preco,estoque,imagem,emoji,tema) VALUES (@id,@nome,@marca,@modelo,@armazenamento,@cor,@preco,@estoque,@imagem,@emoji,@tema)`);
  const inserirCliente = db.prepare(`INSERT INTO clientes (id,nome,cpf,telefone,email,endereco) VALUES (@id,@nome,@cpf,@telefone,@email,@endereco)`);
  const inserirVenda = db.prepare(`INSERT INTO vendas (id,clienteId,produtoId,quantidade,total,pagamento,data) VALUES (@id,@clienteId,@produtoId,@quantidade,@total,@pagamento,@data)`);
  const popular = db.transaction(() => {
    [
      {id:1,nome:'iPhone 15 Pro',marca:'Apple',modelo:'A2848',armazenamento:'256 GB',cor:'Titânio Natural',preco:7299.90,estoque:8,imagem:'',emoji:'▰',tema:'gold'},
      {id:2,nome:'Galaxy S24 Ultra',marca:'Samsung',modelo:'SM-S928B',armazenamento:'256 GB',cor:'Cinza',preco:6199,estoque:3,imagem:'',emoji:'▰',tema:'blue'},
      {id:3,nome:'Pixel 8 Pro',marca:'Google',modelo:'GC3VE',armazenamento:'128 GB',cor:'Obsidiana',preco:4899,estoque:12,imagem:'',emoji:'▰',tema:'black'},
      {id:4,nome:'Moto Edge 40',marca:'Motorola',modelo:'XT2303',armazenamento:'256 GB',cor:'Azul',preco:2699.90,estoque:2,imagem:'',emoji:'▰',tema:'blue'},
      {id:5,nome:'Redmi Note 13',marca:'Xiaomi',modelo:'2312DRA',armazenamento:'128 GB',cor:'Verde',preco:1699.90,estoque:18,imagem:'',emoji:'▰',tema:'gold'}
    ].forEach(item => inserirProduto.run(item));
    [
      {id:1,nome:'Mariana Costa',cpf:'123.456.789-00',telefone:'(11) 98888-1234',email:'mariana@email.com',endereco:'São Paulo, SP'},
      {id:2,nome:'Rafael Almeida',cpf:'987.654.321-00',telefone:'(21) 97777-4321',email:'rafael@email.com',endereco:'Rio de Janeiro, RJ'},
      {id:3,nome:'Camila Santos',cpf:'456.789.123-00',telefone:'(31) 96666-8765',email:'camila@email.com',endereco:'Belo Horizonte, MG'}
    ].forEach(item => inserirCliente.run(item));
    [
      {id:1001,clienteId:1,produtoId:1,quantidade:1,total:7299.90,pagamento:'Cartão de crédito',data:'2026-10-04T14:30:00'},
      {id:1002,clienteId:2,produtoId:2,quantidade:1,total:6199,pagamento:'PIX',data:'2026-10-03T10:10:00'},
      {id:1003,clienteId:3,produtoId:3,quantidade:2,total:9798,pagamento:'Cartão de crédito',data:'2026-10-02T16:45:00'},
      {id:1004,clienteId:1,produtoId:5,quantidade:1,total:1699.90,pagamento:'Dinheiro',data:'2026-10-01T09:20:00'}
    ].forEach(item => inserirVenda.run(item));
  });
  popular();
}

function obterEstado() {
  return {
    produtos: db.prepare('SELECT * FROM produtos ORDER BY id').all(),
    clientes: db.prepare('SELECT * FROM clientes ORDER BY id').all(),
    vendas: db.prepare('SELECT * FROM vendas ORDER BY data').all()
  };
}

function salvarEstado(estado) {
  const salvar = db.transaction(() => {
    db.prepare('DELETE FROM vendas').run();
    db.prepare('DELETE FROM clientes').run();
    db.prepare('DELETE FROM produtos').run();
    const produto = db.prepare(`INSERT INTO produtos (id,nome,marca,modelo,armazenamento,cor,preco,estoque,imagem,emoji,tema) VALUES (@id,@nome,@marca,@modelo,@armazenamento,@cor,@preco,@estoque,@imagem,@emoji,@tema)`);
    const cliente = db.prepare(`INSERT INTO clientes (id,nome,cpf,telefone,email,endereco) VALUES (@id,@nome,@cpf,@telefone,@email,@endereco)`);
    const venda = db.prepare(`INSERT INTO vendas (id,clienteId,produtoId,quantidade,total,pagamento,data) VALUES (@id,@clienteId,@produtoId,@quantidade,@total,@pagamento,@data)`);
    (estado.produtos || []).forEach(item => produto.run({...item, imagem:item.imagem || '', emoji:item.emoji || '▰', tema:item.tema || 'blue'}));
    (estado.clientes || []).forEach(item => cliente.run(item));
    (estado.vendas || []).forEach(item => venda.run(item));
  });
  salvar();
  return obterEstado();
}

module.exports = { obterEstado, salvarEstado };
