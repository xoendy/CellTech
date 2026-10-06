const express = require('express');
const path = require('path');
const { obterEstado, salvarEstado } = require('./db');

const app = express();
const PORTA = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname));

app.get('/api/health', (req, res) => res.json({ ok: true, banco: 'SQLite', projeto: 'CellTech' }));
app.get('/api/state', (req, res) => res.json(obterEstado()));
app.post('/api/state', (req, res) => {
  try {
    const estado = salvarEstado(req.body);
    res.json({ ok: true, estado });
  } catch (erro) {
    console.error(erro);
    res.status(400).json({ ok: false, mensagem: 'Não foi possível salvar os dados.' });
  }
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.listen(PORTA, '0.0.0.0', () => {
  console.log(`CellTech rodando em http://localhost:${PORTA}`);
  console.log('Banco SQLite conectado em ./celltech.db');
});
