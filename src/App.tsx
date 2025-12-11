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

interface ItemCarrinho {
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
  nome: string;
}

interface Carrinho {
  _id: string;
  usuarioId: string;
  itens: ItemCarrinho[];
  dataAtualizacao: Date;
  total: number;
}

interface TokenPayload {
  nome: string;
  tipo: string;
}

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  const [carrinho, setCarrinho] = useState<Carrinho>()
  const [user, setUser] = useState<TokenPayload | null>(null)
  const [busca, setBusca] = useState("")
  const [mensagem, setMensagem] = useState<string>("");

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

  useEffect(() => {
    api.get("/produtos")
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error('Erro ao buscar produtos:', error))
    api.get("/carrinho")
      .then((response) => setCarrinho(response.data))
      .catch((error) => console.error('Erro ao buscar carrinho:', error))
  }, [])

  async function adicionarCarrinho(produtoId: string) {
    const resultado = await api.post(`/adicionarItem`, { produtoId, quantidade: 1 })
    setCarrinho(resultado.data)
    setMensagem("Produto adicionado ao carrinho")
  }
  const removerItem = (produtoId: string) => {
    console.log("Removendo item:", produtoId);
    api.delete(`/carrinho/remover/${produtoId}`)
      .then((response) => {
        setCarrinho(response.data);
      })
      .catch((error) => {
        console.error("Erro ao remover item do carrinho:", error);
        setMensagem("Produto removido do carrinho")
      });

  }
  const buscarProdutos = () => {
    api.get(`/produtos/buscar?termo=${busca}`)
      .then((res) => setProdutos(res.data))
      .catch(() => console.log("Erro ao buscar produtos"));
       setMensagem("Buscando produtos");
  };

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

      {/* CAMPO DE BUSCA */}
      <input
        type="text"
        placeholder="Buscar produto"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        onKeyUp={buscarProdutos}
        style={{ padding: "8px", marginBottom: "20px", width: "300px" }}
      />


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

      {mensagem && (
        <p style={{ color: "blue", fontWeight: "bold" }}>
          {mensagem}
        </p>
      )}


      {/* CARRINHO */}
      <div className="carrinho-container">
        <h2>Carrinho</h2>

        {carrinho&&carrinho?.itens?.length === 0 ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          <ul>
            {carrinho?.itens.map((item) => (
              <li key={item.produtoId}>
                {item.nome} — {item.quantidade}x —
                R${(item.precoUnitario * item.quantidade).toFixed(2)}
                <button
                  onClick={() => removerItem(item.produtoId)}
                  style={{ marginLeft: "10px", color: "white", background: "red" }}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
        <Link to="/finalizar-compra">Pagamento</Link>



        <h3>Total: R$ {carrinho?.total.toFixed(2)}</h3>
      </div>
    </>
  )
}

export default App
