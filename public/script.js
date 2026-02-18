const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

// --- 1. CHARGER ET AFFICHER LES UTILISATEURS ---
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();

        userList.innerHTML = ''; // On vide la liste

        if (users.length === 0) {
            userList.innerHTML = '<li class="list-group-item text-muted">Aucun utilisateur trouvé.</li>';
            return;
        }

        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            
            // Texte de l'utilisateur
            li.textContent = `${user.prenom} ${user.nom} (${user.age} ans)`;

            // --- NOUVEAU : Bouton de suppression ---
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm'; // Style Bootstrap rouge
            deleteBtn.textContent = 'X';
            
            // Quand on clique, on lance la suppression
            deleteBtn.onclick = () => deleteUser(user.id);

            // On ajoute le bouton à la ligne
            li.appendChild(deleteBtn);
            userList.appendChild(li);
        });

    } catch (error) {
        console.error("Erreur de chargement:", error);
    }
}

// --- 2. AJOUTER UN UTILISATEUR ---
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const age = document.getElementById('age').value;

    await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, prenom, age })
    });

    userForm.reset();
    loadUsers(); // On recharge la liste
});

// --- 3. SUPPRIMER UN UTILISATEUR (Exercice 5.1) ---
async function deleteUser(id) {
    if(!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    try {
        // On appelle la route DELETE /api/users/:id
        await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });
        
        // On recharge la liste pour voir qu'il a disparu
        loadUsers();
    } catch (error) {
        console.error("Erreur de suppression:", error);
        alert("Impossible de supprimer.");
    }
}

// Lancement au démarrage
loadUsers();