import { useEffect, useState } from "react";
import api from "../../api/api";

interface Usuario {
  _id: string;
  nome: string;
  email: string;
  idade: number;
  tipoUsuario: string;
}

export default function ListarUsuariosAdmin() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        // Pega o token do localStorage (login do admin)
        const token = localStorage.getItem("token");

        const resposta = await api.get("/admin/usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuarios(resposta.data);
      } catch (error: any) {
        console.error("Erro ao carregar usuários:", error);
        setErro("Erro ao carregar lista de usuários ou acesso negado!");
      }
    }

    carregarUsuarios();
  }, []);

  return (
    <div className="usuarios-container" style={{ padding: "20px" }}>
      <h2>Usuários Cadastrados</h2>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {usuarios.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <div>
          {usuarios.map((usuario) => (
            <div
              key={usuario._id}
              className="usuario-item"
            
            >
              <p><strong>Nome:</strong> {usuario.nome}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Idade:</strong> {usuario.idade}</p>
              <p><strong>Tipo:</strong> {usuario.tipoUsuario}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
