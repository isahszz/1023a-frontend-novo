import { useEffect, useState } from "react";
import api from "../../api/api";

type ProdutoType = {
  _id: string;
  nome: string;
  preco: number;
  urlfoto: string;
};

type ItemType = {
  _id: string;
  produto: ProdutoType;
  quantidade: number;
};

function Carrinho() {
  const [itens, setItens] = useState<ItemType[]>([]);

  // Carregar itens do carrinho
  useEffect(() => {
    api
      .get("/carrinho")
      .then((response) => setItens(response.data.itens))
      .catch((error) => console.error("Erro ao carregar carrinho:", error));
  }, []);

  // Remover item
  function removerCarrinho(produtoId: string) {
    api
      .delete(`/removerItem/${produtoId}`)
      .then(() => {
        alert("Item removido do carrinho!");
        // Atualiza lista localmente
        setItens((prev) => prev.filter((item) => item.produto._id !== produtoId));
      })
      .catch((error) => {
        console.error("Erro ao remover:", error);
        alert("Erro ao remover o item do carrinho.");
      });
  }

  return (
    <div>
      <h1>Meu Carrinho</h1>

      {itens.length === 0 && <p>Seu carrinho está vazio.</p>}

      {itens.map((item) => (
        <div key={item._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <h3>{item.produto.nome}</h3>
          <p>R$ {item.produto.preco}</p>
          <img src={item.produto.urlfoto} alt={item.produto.nome} width="150" />
          <p>Quantidade: {item.quantidade}</p>
          <button onClick={() => removerCarrinho(item.produto._id)}>Remover</button>
        </div>
      ))}
    </div>
  );
}

export default Carrinho;
