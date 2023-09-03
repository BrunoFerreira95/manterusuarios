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
