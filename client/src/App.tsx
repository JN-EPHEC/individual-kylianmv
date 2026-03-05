import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<any[]>([]); // On utilise any[] pour éviter les blocages de type au début

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(result => {
        // Si le résultat est bien un tableau, on l'enregistre
        if (Array.isArray(result)) {
          setData(result);
        }
      })
      .catch(err => console.error("Erreur de connexion à l'API :", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Liste des inscrits</h1>
      
      {data.length === 0 ? (
        <p>Aucun utilisateur trouvé. (Vérifie Swagger !)</p>
      ) : (
        <ul style={{ lineHeight: "2" }}>
          {data.map((user: any) => (
            <li key={user.id}>
              <strong>{user.prenom} {user.nom}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;