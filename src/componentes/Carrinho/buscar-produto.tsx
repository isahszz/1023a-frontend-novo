  import { useState } from "react"
import api from "../../api/api"

function BuscarProdutos() {
  const [q, setQ] = useState("")
  const [resultados, setResultados] = useState<any[]>([])

  function buscar(event: React.FormEvent) {
    event.preventDefault()
    api.get(`/produtos/buscar?q=${encodeURIComponent(q)}`)
      .then(res => setResultados(res.data))
      .catch(err => {
        console.error("Erro ao buscar:", err)
        alert("Erro ao buscar produtos")
      })
  }

  return (
    <div>
      <form onSubmit={buscar}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome ou categoria"
        />
        <button type="submit">Buscar</button>
      </form>

      <ul>
        {resultados.map(p => (
          <li key={p._id}>{p.nome} — {p.categoria} — R$ {p.preco}</li>
        ))}
      </ul>
    </div>
  )
}

export default BuscarProdutos
