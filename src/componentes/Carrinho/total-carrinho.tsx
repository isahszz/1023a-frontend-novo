import React, { useState, useEffect } from 'react';

type ProdutoType = {
  _id: string;
  nome: string;
  preco: number;
  quantidade: number; // quantidade de cada produto no carrinho
};

const Carrinho = () => {
  const [produtos, setProdutos] = useState<ProdutoType[]>([
    { _id: '1', nome: 'Perfume', preco: 50, quantidade: 2 },
    { _id: '2', nome: 'Creme', preco: 30, quantidade: 1 },
  ]);

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    // Calcula o total sempre que os produtos mudarem
    const novoTotal = produtos.reduce(
      (acc, produto) => acc + produto.preco * produto.quantidade,
      0
    );
    setTotal(novoTotal);
  }, [produtos]);

  return (
    <div>
      <h1>Carrinho</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto._id}>
            {produto.nome} - R${produto.preco} x {produto.quantidade}
          </li>
        ))}
      </ul>
      <h2>Total: R${total}</h2>
    </div>
  );
};

export default Carrinho;
