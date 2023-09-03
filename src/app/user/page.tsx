'use client'

import React, { RefObject, useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"  

import { fetchUsers } from '@/controllers/user.controllers'

import Header from '@/components/Header'
import Footer from '@/components/Footer'


type UsersProps ={
    id: number;
    nome: string;
    email: string;
    data_de_nascimento: string;
}[] | {
  id: number;
    nome: string;
    email: string;
    data_de_nascimento: string;
}

interface DialogRefType {
  openDialog: () => void;
  closeDialog: () => void;
}


const UserHome = () => {
  const [users, setUsers] = useState<UsersProps>([])

  const dialogRef: RefObject<HTMLDialogElement> = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UsersProps>()

  const onSubmit: SubmitHandler<UsersProps> = (data) => {
    console.log(data)
  }
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
            <button onClick={() => showModal(dialogRef)} className='cursor-pointer border-2 rounded-lg p-5'> Adicionar Usuário</button>
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
        <dialog ref={dialogRef} className='w-1/5 rounded-lg border-2 border-black'>
            <div className='flex justify-end'>
              <button onClick={() => closeModal(dialogRef)} className='m-5'>Fechar</button>

            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5'>
              <label htmlFor="nome">Nome:</label>
              <input className='border-2 border-black rounded-lg' type="text" required {...register('nome')}/>
              <label htmlFor="email">Email:</label>
              <input className='border-2 border-black rounded-lg' type="email" required {...register('email')}/>
              <label htmlFor="data_de_nascimento">Data de nascimento:</label>
              <input className='border-2 border-black rounded-lg' type="date" required {...register('data_de_nascimento')}/>
              <div className='flex justify-center'>
                <button className='p-2 bg-blue-500 w-1/4 rounded-lg mt-5 text-white'>Salvar</button>

              </div>
            </form>
        </dialog>
        <Footer/>
      </div>
    </div>
    </>
  )
}

export default UserHome

function showModal(dialogRef: RefObject<HTMLDialogElement>) {
  dialogRef.current?.showModal()
}

function closeModal(dialogRef: RefObject<HTMLDialogElement>) {
  dialogRef.current?.close()
}