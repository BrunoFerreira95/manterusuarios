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
