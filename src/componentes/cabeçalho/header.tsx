import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ forma correta
import "./Header.css";

interface Usuario {
  nome: string;
  tipo: string;
}

export default function Header() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUsuario({
          nome: decoded.nome,
          tipo: decoded.tipo,
        });
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
      }
    }
  }, []);

  return (
    <header className="header">
      <h1>Minha Loja</h1>
      {usuario && (
        <div className="usuario-logado">
          <span>{usuario.nome} ({usuario.tipo})</span>
        </div>
      )}
    </header>
  );
}
