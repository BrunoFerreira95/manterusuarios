import Header from '@/components/Header'
import React from 'react'

const UserHome = () => {
  return (
    <>
    <div className='flex justify-center min-h-screen max-h-fit w-screen'>
      <div className='flex flex-col w-2/4'>
        <Header/>
        <main>
          <input type="text" placeholder='Pesquisar por nome'/>
          <button> Adicionar Usuário</button>
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
      </div>
    </div>
    </>
  )
}

export default UserHome