import { useEffect, useState } from "react";
import axios from "axios";

interface Produto {
  _id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

export default function TotalCarrinho() {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function carregarCarrinho() {
      try {
        const resposta = await axios.get("http://localhost:8000/carrinho");
        const itens = resposta.data;

        setCarrinho(itens);

        // soma o total automaticamente
        const soma = itens.reduce(
          (acc: number, item: Produto) => acc + item.preco * item.quantidade,
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
      <h2> Meu Carrinho</h2>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          {carrinho.map((item) => (
            <div key={item._id} className="item-carrinho">
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
