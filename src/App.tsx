import './App.css'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <header>
        <h1>Sorveteria</h1>
      </header>

      <nav>
        <Link to="/cadastrar-produto">Cadastrar Produto</Link>
        <br />
        <Link to="/produtos">Ver Produtos</Link>
      </nav>
    </>
  )
}

export default App
