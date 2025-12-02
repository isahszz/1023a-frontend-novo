import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  nome: string;
  tipo: string;
}

export default function Header() {
  const [user, setUser] = useState<TokenPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUser(decoded);
      } catch (error) {
        console.log("Erro ao decodificar token");
      }
    }
  }, []);

  return (
    <header className="header">
      <h1 className="titulo-header">Meu Sistema</h1>

      {user && (
        <div className="user-info">
          {user.nome} — {user.tipo}
        </div>
      )}
    </header>
  );
}
