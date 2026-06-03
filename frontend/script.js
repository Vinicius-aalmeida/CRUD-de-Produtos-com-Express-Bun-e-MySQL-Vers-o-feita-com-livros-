// ===== CONFIGURAÇÃO DAS APIS =====
const API_PRODUTOS = 'http://localhost:3002/produtos';
const API_LIVROS = 'http://localhost:3002/livros';

// ===== ELEMENTOS DE PRODUTOS =====
const formProduto = document.getElementById('form-produto');
const inputProdutoId = document.getElementById('produto-id');
const inputNome = document.getElementById('nome');
const inputPreco = document.getElementById('preco');
const inputEstoque = document.getElementById('estoque');
const btnCancelar = document.getElementById('btn-cancelar');
const tbodyProdutos = document.querySelector('#tabela-produtos tbody');

// ===== ELEMENTOS DE LIVROS =====
const formLivro = document.getElementById('form-livro');
const inputLivroId = document.getElementById('livro-id');
const inputTitulo = document.getElementById('titulo');
const inputAutor = document.getElementById('autor');
const inputLivroPreco = document.getElementById('livro-preco');
const inputLivroEstoque = document.getElementById('livro-estoque');
const btnCancelarLivro = document.getElementById('btn-cancelar-livro');
const tbodyLivros = document.querySelector('#tabela-livros tbody');

// ===== FUNÇÕES AUXILIARES =====
function criarCelula(texto) {
  const td = document.createElement('td');
  td.textContent = texto;
  return td;
}

function criarBotao(rotulo, classe, id) {
  const botao = document.createElement('button');
  botao.textContent = rotulo;
  botao.className = classe;
  botao.dataset.id = id;
  return botao;
}

// ===== CRUD DE PRODUTOS =====
async function listarProdutos() {
  const resposta = await fetch(API_PRODUTOS);
  const produtos = await resposta.json();
  tbodyProdutos.replaceChildren();
  produtos.forEach((p) => {
    const tr = document.createElement('tr');
    tr.append(
      criarCelula(p.id),
      criarCelula(p.nome),
      criarCelula(`R$ ${Number(p.preco).toFixed(2)}`),
      criarCelula(p.estoque),
    );
    const tdAcoes = document.createElement('td');
    tdAcoes.append(
      criarBotao('Editar', 'btn-editar', p.id),
      criarBotao('Excluir', 'btn-excluir', p.id),
    );
    tr.append(tdAcoes);
    tbodyProdutos.append(tr);
  });
}

async function salvarProduto(evento) {
  evento.preventDefault();
  const dados = {
    nome: inputNome.value,
    preco: parseFloat(inputPreco.value),
    estoque: parseInt(inputEstoque.value, 10),
  };
  const id = inputProdutoId.value;
  const url = id ? `${API_PRODUTOS}/${id}` : API_PRODUTOS;
  const metodo = id ? 'PUT' : 'POST';
  await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  resetarFormularioProduto();
  listarProdutos();
}

async function editarProduto(id) {
  const resposta = await fetch(`${API_PRODUTOS}/${id}`);
  const produto = await resposta.json();
  inputProdutoId.value = produto.id;
  inputNome.value = produto.nome;
  inputPreco.value = produto.preco;
  inputEstoque.value = produto.estoque;
  btnCancelar.hidden = false;
}

async function excluirProduto(id) {
  if (!confirm('Deseja excluir este produto?')) return;
  await fetch(`${API_PRODUTOS}/${id}`, { method: 'DELETE' });
  listarProdutos();
}

function resetarFormularioProduto() {
  formProduto.reset();
  inputProdutoId.value = '';
  inputEstoque.value = '0';
  btnCancelar.hidden = true;
}

// ===== CRUD DE LIVROS =====
async function listarLivros() {
  const resposta = await fetch(API_LIVROS);
  const livros = await resposta.json();
  tbodyLivros.replaceChildren();
  livros.forEach((l) => {
    const tr = document.createElement('tr');
    tr.append(
      criarCelula(l.id),
      criarCelula(l.titulo),
      criarCelula(l.autor),
      criarCelula(`R$ ${Number(l.preco).toFixed(2)}`),
      criarCelula(l.estoque),
    );
    const tdAcoes = document.createElement('td');
    tdAcoes.append(
      criarBotao('Editar', 'btn-editar-livro', l.id),
      criarBotao('Excluir', 'btn-excluir-livro', l.id),
    );
    tr.append(tdAcoes);
    tbodyLivros.append(tr);
  });
}

async function salvarLivro(evento) {
  evento.preventDefault();
  const dados = {
    titulo: inputTitulo.value,
    autor: inputAutor.value,
    preco: parseFloat(inputLivroPreco.value),
    estoque: parseInt(inputLivroEstoque.value, 10),
  };
  const id = inputLivroId.value;
  const url = id ? `${API_LIVROS}/${id}` : API_LIVROS;
  const metodo = id ? 'PUT' : 'POST';
  await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  resetarFormularioLivro();
  listarLivros();
}

async function editarLivro(id) {
  const resposta = await fetch(`${API_LIVROS}/${id}`);
  const livro = await resposta.json();
  inputLivroId.value = livro.id;
  inputTitulo.value = livro.titulo;
  inputAutor.value = livro.autor;
  inputLivroPreco.value = livro.preco;
  inputLivroEstoque.value = livro.estoque;
  btnCancelarLivro.hidden = false;
}

async function excluirLivro(id) {
  if (!confirm('Deseja excluir este livro?')) return;
  await fetch(`${API_LIVROS}/${id}`, { method: 'DELETE' });
  listarLivros();
}

function resetarFormularioLivro() {
  formLivro.reset();
  inputLivroId.value = '';
  inputLivroEstoque.value = '0';
  btnCancelarLivro.hidden = true;
}

// ===== EVENTOS =====
formProduto.addEventListener('submit', salvarProduto);
btnCancelar.addEventListener('click', resetarFormularioProduto);

tbodyProdutos.addEventListener('click', (evento) => {
  const id = evento.target.dataset.id;
  if (!id) return;
  if (evento.target.classList.contains('btn-editar')) editarProduto(id);
  else if (evento.target.classList.contains('btn-excluir')) excluirProduto(id);
});

formLivro.addEventListener('submit', salvarLivro);
btnCancelarLivro.addEventListener('click', resetarFormularioLivro);

tbodyLivros.addEventListener('click', (evento) => {
  const id = evento.target.dataset.id;
  if (!id) return;
  if (evento.target.classList.contains('btn-editar-livro')) editarLivro(id);
  else if (evento.target.classList.contains('btn-excluir-livro')) excluirLivro(id);
});

// ===== INICIALIZAR =====
listarProdutos();
listarLivros();