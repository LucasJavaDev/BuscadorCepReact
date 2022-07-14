import { useState } from "react";

import { styles } from "./styles.css";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";

export default function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum CEP!");
      return;
    }
    try {
      const response = await api.get(`${input}/json/`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Erro ao buscar o CEP");
      setInput("");
    }
  }

  return (
    <main>
      <section className="input">
        <h1 className="title">Buscador CEP</h1>
        <div className="containerInput">
          <input
            className="inputItem"
            type="text"
            placeholder="Digite seu CEP"
            id="inputText"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="button"
            className="inputItem"
            id="button"
            onClick={handleSearch}
          >
            <FiSearch size="25" color="#fff" />
          </button>
        </div>
      </section>
      {Object.keys(cep).length > 0 && (
        <section className="info">
          <div className="infoLocate">
            <h2>CEP: {cep.cep}</h2>
            <span>Logradouro: {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Localidade: {cep.localidade}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>
              Estado: {cep.estado} - {cep.uf}
            </span>
          </div>
        </section>
      )}
    </main>
  );
}
