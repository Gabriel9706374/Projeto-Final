const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const {DatabaseSync} = require('node:sqlite');

const db = new DatabaseSync(path.join(__dirname,'meu banco.db'));
db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    data TEXT,
    idade INTEGER,
    categoria TEXT,
    email TEXT,
    senha TEXT,
    pais TEXT,
    jogador_favorito TEXT
)`);

const porta=3000;

const servidor = http.createServer(async(req,res)=>{
    if(req.url ==='/api/usuarios'&& req.method === 'GET'){
        const usuarios = db.prepare('SELECT * FROM usuarios ORDER BY id DESC').all();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(usuarios));
        return;
    }
    if(req.url === '/api/usuarios'&& req.method === 'POST'){
        let corpo = "";
        for await(const pedaco of req)corpo += pedaco;
        const dados = JSON.parse(corpo);
        db.prepare(`
INSERT INTO usuarios
(nome, data, idade, categoria, email, senha, pais, jogador_favorito)
VALUES (?, ?, ?, ?, ?, ?, ?)
`).run(
    dados.nome,
    dados.data,
    dados.idade,
    dados.categoria,
    dados.email,
    dados.senha,
    dados.pais,
    dados.jogador_favorito
);
        res.end('ok');
        return;
    }
    const paginaInicial = req.url === '/' ? './Cadastro.html': req.url;

    if(paginaInicial.endsWith('.css')){
        res.setHeader('Content-Type','text/css');
    }
    if (paginaInicial.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
}
    fs.readFile(path.join(__dirname,paginaInicial),(erro,conteudo)=>{
        res.end(erro?'arquivo não encontrado' : conteudo);
    });
});

servidor.listen(3000,()=>{
    console.log('servidor rodando em http://localhost:3000');
});

if(req.url === '/api/ultimo' && req.method === 'GET'){
    const usuario = db.prepare(`
        SELECT * FROM usuarios
        ORDER BY id DESC
        LIMIT 1
    `).get();
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify(usuario));
    return;
}