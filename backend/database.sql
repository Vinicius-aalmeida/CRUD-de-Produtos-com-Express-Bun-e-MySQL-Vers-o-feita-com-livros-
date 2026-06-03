CREATE DATABASE IF NOT EXISTS dsw_crud;
USE dsw_crud;

CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  estoque INT NOT NULL DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produtos (nome, preco, estoque) VALUES
  ('Caneta Azul', 2.50, 100),
  ('Caderno 96 folhas', 15.90, 50),
  ('Borracha', 1.20, 200);
