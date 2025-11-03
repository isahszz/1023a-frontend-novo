import { Link } from "react-router-dom"
import api from "../../api/api"

function CadastrarProduto() {
    function handleForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const data = {
            nome: formData.get('nome') as string,
            preco: Number(formData.get('preco')),
            urlfoto: formData.get('urlfoto') as string,
            descricao: formData.get('descricao') as string
        }
        api.post("/produtos", data)
            //.then((response) => setProdutos([...produtos, response.data]))
            .catch((error) => {
                console.error('Error posting data:', error)
                alert('Error posting data:' + error?.mensagem)
            })
        form.reset()
    }
    return (
        <div>
            <Link to="/">Cadastrar Produto</Link>
            <h2>Cadastrar Produto</h2>
            <form onSubmit={handleForm}>
                <input type="text" name="nome" placeholder="Nome do Produto" />
                <input type="number" name="preco" placeholder="Preço" />
                <input type="text" name="urlfoto" placeholder="URL da Foto" />
                <input type="text" name="descricao" placeholder="Descrição" />
                <input type="text" name="categoria" placeholder="Categoria" />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}
export default CadastrarProduto;