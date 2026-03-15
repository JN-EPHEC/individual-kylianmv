import { useEffect, useState } from "react";

interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  // La fonction qui va chercher les données
  const refreshList = () => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erreur API :", err));
  };

  // On lance le chargement au démarrage
  useEffect(() => {
    refreshList();
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>🚀 Liste des Utilisateurs</h1>
      <button onClick={refreshList} style={{ marginBottom: "20px", padding: "10px" }}>
        Actualiser la liste
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.length === 0 ? <p>Aucun utilisateur trouvé...</p> : 
          users.map((u) => (
            <li key={u.id} style={{ background: "#333", color: "white", margin: "10px auto", padding: "10px", borderRadius: "8px", maxWidth: "300px" }}>
              <strong>{u.prenom} {u.nom}</strong>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;