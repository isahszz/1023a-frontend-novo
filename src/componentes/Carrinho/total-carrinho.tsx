import { useEffect, useState } from "react";
import api from "../../api/api";

interface ItemCarrinho {
  produtoId: string;
  nome: string;
  preco: number;
  quantidade: number;
}

export default function TotalCarrinho() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function carregarCarrinho() {
      try {
        const resposta = await api.get("/carrinho");
        
        const itens = resposta.data.itens;  
        console.log("Itens do carrinho:", itens);

        setCarrinho(itens);

        const soma = itens.reduce(
          (acc: number, item: ItemCarrinho) => acc + item.preco * item.quantidade,
          0
        );

        setTotal(soma);

      } catch (erro) {
        console.error("Erro ao carregar carrinho:", erro);
      }
    }

    carregarCarrinho();
  }, []);

  return (
    <div className="carrinho-container">
      <h2>Meu Carrinho</h2>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          {carrinho.map((item) => (
            <div key={item.produtoId} className="item-carrinho">
              <p>
                {item.nome} — R$ {item.preco.toFixed(2)} × {item.quantidade}
              </p>
            </div>
          ))}

          <h3>
            Total: <span>R$ {total.toFixed(2)}</span>
          </h3>
        </div>
      )}
    </div>
  );
}
