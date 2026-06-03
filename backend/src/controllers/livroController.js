import pool from '../config/database.js';

export async function listar(req, res) {
  const [rows] = await pool.query('SELECT * FROM livros');
  res.json(rows);
}

export async function buscarPorId(req, res) {
  const [rows] = await pool.query('SELECT * FROM livros WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ erro: 'Livro não encontrado' });
  res.json(rows[0]);
}

export async function criar(req, res) {
  const { titulo, autor, preco, estoque } = req.body;
  const [result] = await pool.query(
    'INSERT INTO livros (titulo, autor, preco, estoque) VALUES (?, ?, ?, ?)',
    [titulo, autor, preco, estoque]
  );
  res.status(201).json({ id: result.insertId, titulo, autor, preco, estoque });
}

export async function atualizar(req, res) {
  const { titulo, autor, preco, estoque } = req.body;
  await pool.query(
    'UPDATE livros SET titulo=?, autor=?, preco=?, estoque=? WHERE id=?',
    [titulo, autor, preco, estoque, req.params.id]
  );
  res.json({ mensagem: 'Livro atualizado com sucesso' });
}

export async function deletar(req, res) {
  await pool.query('DELETE FROM livros WHERE id = ?', [req.params.id]);
  res.json({ mensagem: 'Livro deletado com sucesso' });
}