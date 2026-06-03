import db from '../config/database.js';

export const listar = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM produtos ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const criar = async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;

    if (!nome || preco == null) {
      return res.status(400).json({ erro: 'Nome e preço são obrigatórios' });
    }

    const [result] = await db.query(
      'INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)',
      [nome, preco, estoque ?? 0]
    );

    res.status(201).json({
      id: result.insertId,
      nome,
      preco,
      estoque: estoque ?? 0,
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, estoque } = req.body;

    const [result] = await db.query(
      'UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?',
      [nome, preco, estoque, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json({ id: Number(id), nome, preco, estoque });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM produtos WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    res.json({ mensagem: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
