export function fetchUsers(setUsers) {
  return fetch('http://localhost:3004/pessoa')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar os usuários');
      }
      return response.json();
    })
    .then(data => {
      // A variável 'data' conterá a lista de usuários retornada pelo servidor.
      setUsers(data);
    })
    .catch(error => {
      console.error(error);
      throw error; // Você pode escolher como lidar com erros, como lançar uma exceção ou retornar um objeto de erro personalizado.
    });
}

export function createUser(newUser, setUsers) {
  return fetch('http://localhost:3004/pessoa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao criar o usuário');
      }
      return response.json();
    })
    .then(data => {
      // Adicione o novo usuário à lista existente de usuários usando setUsers
      setUsers(users => [...users, data]);
      return data; // Retorna o novo usuário
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function deleteUser(userId, setUsers) {
  return fetch(`http://localhost:3004/pessoa/${userId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao excluir o usuário');
      }
      return userId; // Retorna o ID do usuário excluído
    })
    .then(deletedUserId => {
      // Remove o usuário da lista usando setUsers
      setUsers(users => users.filter(user => user.id !== deletedUserId));
      return deletedUserId; // Retorna o ID do usuário excluído
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
