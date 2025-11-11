import { useEffect, useState } from "react";
import api from "../../api/api.ts";
import { useNavigate } from "react-router-dom";

interface Usuario {
  nome: string;
  email: string;
}

interface ItemCarrinho {
  produto: string;
  quantidade: number;
}

interface Carrinho {
  _id: string;
  usuario: Usuario;
  itens: ItemCarrinho[];
}

export default function AdminCarrinhos() {
  const [carrinhos, setCarrinhos] = useState<Carrinho[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("admin");

    // Verifica se o usuário é ADMIN
    if (!token || admin !== "true") {
      alert("Acesso negado. Somente administradores podem acessar esta área.");
      navigate("/login");
      return;
    }

    // Busca todos os carrinhos
    api
      .get("/carrinhos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCarrinhos(response.data.carrinhos))
      .catch(() => setErro("Erro ao carregar carrinhos."))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div>
      <h2>Lista de Carrinhos (Admin)</h2>
      <p>Total: {carrinhos.length}</p>

      {carrinhos.length === 0 ? (
        <p>Nenhum carrinho encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Email</th>
              <th>Itens</th>
            </tr>
          </thead>
          <tbody>
            {carrinhos.map((carrinho) => (
              <tr key={carrinho._id}>
                <td>{carrinho.usuario?.nome || "Sem nome"}</td>
                <td>{carrinho.usuario?.email || "Sem email"}</td>
                <td>{carrinho.itens.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
