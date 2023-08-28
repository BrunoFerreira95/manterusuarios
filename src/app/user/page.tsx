import React from 'react'

const UserHome = () => {
  return (
    <>
    <header>
      <h1>Gerenciamento de usuários</h1>
    </header>
      <hr />
      <input type="text" placeholder='Pesquisar por nome'/>
      <button> Adicionar Usuário</button>
      <main>
        <form action="">
          <table>
            <caption>Usuários</caption>
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Data de Nascimento</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Bruno</th>
                <th>bruno@gmail.com</th>
                <th>04/04/2004</th>
                <th>Editar | Remover</th>
              </tr>
              <tr>
                <th>Bruno</th>
                <th>bruno@gmail.com</th>
                <th>04/04/2004</th>
                <th>Editar | Remover</th>
              </tr>
            </tbody>
          </table>
        </form>
      </main>
      <hr />
    <footer>
      <span>Desenvolvido por Bruno Ferreira</span>
    </footer>
    </>
  )
}

export default UserHome