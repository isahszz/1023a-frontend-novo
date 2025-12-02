import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Login from './componentes/login/login.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CadastrarProduto from './componentes/cadastrar-produto/cadastrar-produto.tsx';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CartaoPagamento from './componentes/cartao/cartao-pagamento.tsx';

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); // chave pública

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Elements stripe={stripe}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar-produto" element={<CadastrarProduto />} />
          <Route path="/finalizar-compra" element={<CartaoPagamento />} />
        </Routes>
      </BrowserRouter>
    </Elements>
  </StrictMode>,
);
