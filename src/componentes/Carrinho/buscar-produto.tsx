import { Link } from "react-router-dom"
import api from "../../api/api"
import { useState } from "react"

function BuscarProdutos() {
    const [resultados, setResultados] = useState<any[]>([])

    function handleForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const fd = new FormData(form)
        const termo = fd.get("nome") as string
        const termo = fd.get("categoria") as string

        api.get(`/produtos?q=${encodeURIComponent(termo)}`)
            .then((response) => {
                setResultados(response.data)
            })
            .catch((error) => {
                console.error("Erro na busca:", error)
                alert("Erro ao buscar: " + (error.response?.data?.mensagem || error.message))
            })
        
        form.reset()
    }

    return (
        <div>
            <Link to="/">Voltar</Link>

            <h2>Buscar Produtos</h2>

            <form onSubmit={handleForm}>
                <input type="text" name="nome" placeholder="Buscar por nome" />
                <input type="text" name="categoria" placeholder="Buscar por categoria" />
                <button type="submit">Buscar</button>
            </form>

            <h3>Resultados:</h3>
            <ul>
                {resultados.map((p) => (
                    <li key={p.id}>
                        {p.nome} - {p.categoria} - R$ {p.preco} 
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BuscarProdutos
