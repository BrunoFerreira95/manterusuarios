import { formatDate } from "@/utils/formatData";

export async function fetchUsers(setUsers) {
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

export async function createUser(newUser, setUsers) {
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

export async function deleteUser(userId, setUsers) {
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


export async function editUser(userId, user, updatedUserData, setUsers) {
  let updatedUserDataFormatted; // Declaração da variável no escopo local

  // Verifique se updatedUserData.data_de_nascimento está definida e não é vazia
  if (updatedUserData.data_de_nascimento) {
    // Formate a data para o formato "yyyy-MM-dd"
    const formattedDate = formatDate(updatedUserData.data_de_nascimento);

    // Crie uma cópia dos dados atualizados com a data formatada
    updatedUserDataFormatted = { ...updatedUserData, data_de_nascimento: formattedDate };
  } else {
    // Se updatedUserData.data_de_nascimento não está definida ou é vazia, mantenha o valor original
    updatedUserDataFormatted = { ...updatedUserData, data_de_nascimento: user.data_de_nascimento };
  }

  return fetch(`http://localhost:3004/pessoa/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserDataFormatted),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao editar o usuário');
      }
      return response.json();
    })
    .then(data => {
      setUsers(users => {
        const updatedUsers = users.map(currentUser => {
          if (currentUser.id === userId) {
            return { ...currentUser, ...data };
          }
          return currentUser;
        });
        return updatedUsers;
      });
      return data;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

