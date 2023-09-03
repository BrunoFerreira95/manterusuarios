'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { fetchUsers } from '@/controllers/user.controllers'
import React, { useEffect, useState } from 'react'

type UsersProps ={
    id: number;
    nome: string;
    email: string;
    data_de_nascimento: string;
}[]

const UserHome = () => {
  const [users, setUsers] = useState<UsersProps>([])


  useEffect(() => {
    fetchUsers(setUsers)
  }, [])
  return (
    <>
    <div className='flex justify-center min-h-screen max-h-fit w-screen'>
      <div className='flex flex-col w-2/4'>
        <Header/>
        <main className='flex justify-center items-center flex-col m-5'>
          <div className='flex justify-between w-full '>
            <input type="text" placeholder='Pesquisar por nome' className='border-2 rounded-lg p-5 '/>
            <button className='cursor-pointer border-2 rounded-lg p-5'> Adicionar Usuário</button>
          </div>
          <table className='border p-5 m-10'>
            <caption className='text-lg'>Usuários</caption>
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
                <th scope="col">Data de Nascimento</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users ? users.map((user) => (
                <tr key={user.id}>
                  <th>{user.nome}</th>
                  <th>{user.email}</th>
                  <th>{user.data_de_nascimento}</th>
                  <th>Editar | Remover</th>
                </tr>

              )): <span>
                Nenhum usuário encontrado
                </span>}

            </tbody>
          </table>
        </main>
        <Footer/>
      </div>
    </div>
    </>
  )
}

export default UserHome