import express from 'express';
import cors from 'cors';
import produtoRoutes from './routes/produtoRoutes.js';
import livrosRoutes from './routes/livroRoutes.js';

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROTAS
app.use('/produtos', produtoRoutes);
app.use('/livros', livrosRoutes);

// INICIAR O SERVIDOR
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
