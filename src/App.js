import React from "react";
import api from './services/api'

import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const data = {
      title: "Test title novo 2", 
      url: "Test URL", 
      techs: "Test Techs"
    }

    await api.post('repositories', data).then(response => {
      setRepositories([ ...repositories, response.data ]);
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then(response => {
      setRepositories([ ...repositories.filter(r => r.id !== id) ]);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
