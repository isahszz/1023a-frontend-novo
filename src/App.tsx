import './App.css'
import api from './api/api'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode"

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

interface TokenPayload {
  nome: string;
  tipo: string;
}

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  const [carrinho, setCarrinho] = useState<ItemCarrinhoType[]>([])
  const [total, setTotal] = useState<number>(0)
  const [user, setUser] = useState<TokenPayload | null>(null)

  // Carregar usuário do token
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded: TokenPayload = jwtDecode(token)
        setUser(decoded)
      } catch (err) {
        console.error("Token inválido:", err)
      }
    }
  }, [])

  // Carregar produtos
  useEffect(() => {
    api.get("/produtos")
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error('Erro ao buscar produtos:', error))
  }, [])

  // Atualizar total sempre que o carrinho mudar
  useEffect(() => {
    const novoTotal = carrinho.reduce(
      (acc, item) => acc + (item.produto.preco * item.quantidade),
      0
    )
    setTotal(novoTotal)
  }, [carrinho])

  // Adicionar item ao carrinho
  function adicionarCarrinho(produtoId: string) {
    const produtoSelecionado = produtos.find(p => p._id === produtoId)

    if (!produtoSelecionado) return

    setCarrinho(prev => {
      const itemExistente = prev.find(item => item.produto._id === produtoId)
      if (itemExistente) {
        return prev.map(item =>
          item.produto._id === produtoId
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      } else {
        return [...prev, { produto: produtoSelecionado, quantidade: 1 }]
      }
    })
  }

  return (
    <>
      {/* HEADER */}
      <header className='header' >
        <h1>Sorveteria</h1>

        {user && (
          <div >
            {user.nome} ({user.tipo})
          </div>
        )}
      </header>

      {/* MENU */}
      <nav>
        <Link to="/cadastrar-produto">Cadastrar Produto</Link>
        <br />
      </nav>

      {/* LISTA DE PRODUTOS */}
      <h2>Lista de Produtos</h2>

      <div className="produtos-container">
        {produtos.map((produto) => (
          <div key={produto._id} className="produto-card">
            <h2>{produto.nome}</h2>
            <p>R$ {produto.preco}</p>
            <img src={produto.urlfoto} alt={produto.nome} />
            <p>{produto.descricao}</p>
            <button onClick={() => adicionarCarrinho(produto._id)}>
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>

      {/* CARRINHO */}
      <div className="carrinho-container">
        <h2>Carrinho</h2>

        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          <ul>
            {carrinho.map((item) => (
              <li key={item.produto._id}>
                {item.produto.nome} — {item.quantidade}x — 
                R${(item.produto.preco * item.quantidade).toFixed(2)}
              </li>
            ))}
          </ul>
        )}

        <h3>Total: R$ {total.toFixed(2)}</h3>
      </div>
    </>
  )
}

export default App
