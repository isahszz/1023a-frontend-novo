import './App.css'
import api from './api/api'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

import TotalCarrinho from './componentes/Carrinho/total-carrinho'

type ProdutoType = {
  _id: string,
  nome: string,
  preco: number,
  urlfoto: string,
  descricao: string,
}

type ItemCarrinhoType = {
  produto: ProdutoType,
  quantidade: number
}

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  const [carrinho, setCarrinho] = useState<ItemCarrinhoType[]>([])
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    api.get("/produtos")
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error('Erro ao buscar produtos:', error))
  }, [])

  useEffect(() => {
    const novoTotal = carrinho.reduce((acc, item) => acc + (item.produto.preco * item.quantidade), 0)
    setTotal(novoTotal)
  }, [carrinho])

  function adicionarItemCarrinho(produtoId: string) {
    console.log(`Adicionando produto ${produtoId} ao carrinho`)
    api.post("/adicionarItem", { produtoId, quantidade: 1 })
      .then(() => alert("Produto adicionado com sucesso!"))
      .catch((error) => {
        if (error.response) {
          console.error(`Servidor respondeu mas com o erro:${error.response.data.mensagem ?? error.response.data}`)
          alert(`Servidor respondeu mas com o erro:${error.response.data.mensagem
            ?? " olhe o console do navegador para mais informações"}"`)
        }
        else { //Não teve resposta do servidor, então mostramos o erro do axios.
          console.error(`Erro Axios: ${error.message}`)
          alert(`Servidor não respondeu, você ligou o backend? Erro do Axios: ${error.message ?? "Erro desconhecido: Chame o TERE"}`)
        }
      })
  }
  return (
    <>
      <header>
        <h1>Sorveteria</h1>
      </header>

      <Link to="/cadastrar-produto">Cadastrar Produto</Link>

      <div>
        <h2>Lista de Produtos</h2>
      </div>

      <div className="produtos-container">
        {produtos.map((produto) => (
          <div key={produto._id} className="produto-card">
            <h2>{produto.nome}</h2>
            <p>R$ {produto.preco}</p>
            <img src={produto.urlfoto} alt={produto.nome} />
            <p>{produto.descricao}</p>
            <button onClick={() => adicionarItemCarrinho(produto._id)}>
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>

      {/* <div className="carrinho-container">
        <h2>Carrinho</h2>
        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          <ul>
            {carrinho.map((item) => (
              <li key={item.produto._id}>

                {item.produto.nome} — {item.quantidade}x — R${(Number(item.produto.preco) * item.quantidade).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        <h3>Total: R$ {total.toFixed(2)}</h3>

      </div> */}

      <TotalCarrinho />
    </>
  )
}

export default App
